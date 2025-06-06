// Salva o usuário no localStorage e marca como logado
function salvarUsuario(email) {
    localStorage.setItem("userEmail", email);
    localStorage.setItem("isLoggedIn", "true");
}

// Obtém o email do usuário logado
function obterUsuario() {
    return localStorage.getItem("userEmail");
}

// Limpa os dados do usuário e marca como deslogado
function limparUsuario() {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("isLoggedIn");
}

// Verifica se o usuário está logado
function verificarLogin() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
        alert("Você precisa estar logado para acessar esta página.");
        window.location.href = "login.html"; // Redireciona para a página de login
    }
}

// Executa a verificação de login ao carregar a página
document.addEventListener("DOMContentLoaded", verificarLogin);