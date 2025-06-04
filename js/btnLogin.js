const logoutBtn = document.getElementById('logout-btn');

if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();  // ✅ Impede que o link recarregue ou vá pra outra página

        localStorage.removeItem('usuarioLogado');  // ✅ Remove a informação de login

        alert('Você saiu com sucesso!');  // ✅ Mensagem opcional

        // ✅ Atualiza o estado do botão
        atualizarBotaoLogin();  // Função que atualiza o botão de Login/Logout
    });
}
