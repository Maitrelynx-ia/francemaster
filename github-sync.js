// France Masters - Système d'upload GitHub
// Publie les cartes (data.js) et les images (dossier images/) directement sur le dépôt.
// Nécessite un Personal Access Token (fine-grained) avec la permission
// "Contents : Read and Write" limitée au dépôt Maitrelynx-ia/francemaster.
// Le token est stocké uniquement dans le localStorage du navigateur et
// n'est envoyé qu'à api.github.com.

const GitHubSync = {
    config: {
        owner: 'Maitrelynx-ia',
        repo: 'francemaster',
        branch: 'main',
        dataPath: 'data.js',
        imagesDir: 'images'
    },
    TOKEN_KEY: 'franceMastersGithubToken'
};

GitHubSync.getToken = function () {
    return localStorage.getItem(GitHubSync.TOKEN_KEY) || '';
};

GitHubSync.setToken = function (token) {
    localStorage.setItem(GitHubSync.TOKEN_KEY, token);
};

GitHubSync.clearToken = function () {
    localStorage.removeItem(GitHubSync.TOKEN_KEY);
};

GitHubSync.hasToken = function () {
    return GitHubSync.getToken().length > 0;
};

GitHubSync.api = function (path, options) {
    options = options || {};
    options.headers = Object.assign({
        'Authorization': 'Bearer ' + GitHubSync.getToken(),
        'Accept': 'application/vnd.github+json'
    }, options.headers || {});
    return fetch('https://api.github.com' + path, options);
};

GitHubSync.contentsUrl = function (path) {
    return '/repos/' + GitHubSync.config.owner + '/' + GitHubSync.config.repo + '/contents/' + encodeURIComponent(path);
};

// Vérifie le token et l'accès au dépôt
GitHubSync.testConnection = async function () {
    const me = await GitHubSync.api('/user');
    if (!me.ok) throw new Error('Token invalide ou expiré (HTTP ' + me.status + ')');
    const user = await me.json();
    const repoRes = await GitHubSync.api('/repos/' + GitHubSync.config.owner + '/' + GitHubSync.config.repo);
    if (!repoRes.ok) throw new Error('Le token n\'a pas accès au dépôt (HTTP ' + repoRes.status + ')');
    const repo = await repoRes.json();
    return { login: user.login, repo: repo.full_name };
};

// Récupère un fichier texte du dépôt
GitHubSync.getFile = async function (path) {
    const res = await GitHubSync.api(GitHubSync.contentsUrl(path) + '?ref=' + encodeURIComponent(GitHubSync.config.branch));
    if (!res.ok) throw new Error('Lecture de ' + path + ' impossible (HTTP ' + res.status + ')');
    const data = await res.json();
    const binary = atob((data.content || '').replace(/\s/g, ''));
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return { sha: data.sha, content: new TextDecoder('utf-8').decode(bytes) };
};

// SHA actuel d'un fichier (null s'il n'existe pas)
GitHubSync.getFileSha = async function (path) {
    const res = await GitHubSync.api(GitHubSync.contentsUrl(path) + '?ref=' + encodeURIComponent(GitHubSync.config.branch));
    if (res.ok) { const data = await res.json(); return data.sha; }
    return null;
};

// Pousse un fichier texte (création ou mise à jour)
GitHubSync.putFile = async function (path, content, message) {
    const sha = await GitHubSync.getFileSha(path);
    const body = {
        message: message || ('Mise à jour de ' + path),
        content: GitHubSync.toBase64(content),
        branch: GitHubSync.config.branch
    };
    if (sha) body.sha = sha;
    const res = await GitHubSync.api(GitHubSync.contentsUrl(path), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    if (!res.ok) {
        const err = await res.json().catch(function () { return {}; });
        throw new Error('Écriture de ' + path + ' impossible (' + (err.message || 'HTTP ' + res.status) + ')');
    }
    return res.json();
};

// Upload d'une image (data URL) dans images/ — renvoie le chemin du fichier
GitHubSync.uploadImage = async function (cardId, dataUrl) {
    const match = dataUrl.match(/^data:image\/([a-zA-Z0-9.+-]+);base64,([\s\S]*)$/);
    if (!match) throw new Error('Format d\'image non supporté');
    let ext = match[1];
    if (ext === 'jpeg') ext = 'jpg';
    if (ext === 'svg+xml') ext = 'svg';
    const filename = 'card-' + cardId + '.' + ext;
    const filePath = GitHubSync.config.imagesDir + '/' + filename;
    const sha = await GitHubSync.getFileSha(filePath);
    const body = {
        message: 'Ajout de l\'image ' + filename,
        content: match[2],
        branch: GitHubSync.config.branch
    };
    if (sha) body.sha = sha;
    const res = await GitHubSync.api(GitHubSync.contentsUrl(filePath), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    if (!res.ok) {
        const err = await res.json().catch(function () { return {}; });
        throw new Error('Upload de ' + filename + ' impossible (' + (err.message || 'HTTP ' + res.status) + ')');
    }
    return filePath;
};

GitHubSync.toBase64 = function (text) {
    const bytes = new TextEncoder().encode(text);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
};

// Extrait le tableau CARDS d'un contenu data.js
GitHubSync.parseCards = function (dataJsContent) {
    try {
        return new Function(dataJsContent + '\nreturn CARDS;')();
    } catch (e) {
        throw new Error('data.js invalide : ' + e.message);
    }
};

window.GitHubSync = GitHubSync;
