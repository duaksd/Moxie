async function login() {
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('password').value.trim();

  if (!email || !senha) {
    alert('Preencha todos os campos.');
    return;
  }

  try {
    const response = await fetch('http://localhost:4000/usuarios/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    });

    if (response.ok) {
      const user = await response.json();

      // ✅ Salvando todas as informações necessárias
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', user.nome);
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('usuarioId', user.id); // <- ESSENCIAL para o carrinho funcionar

      window.location.href = 'index.html';
    } else {
      const errorData = await response.json();
      alert('Erro: ' + errorData.error);
    }
  } catch (error) {
    alert('Erro na requisição: ' + error.message);
  }
}

// Voltar ao index.html ao apertar ESC
document.addEventListener('keydown', function (e) {
  if (e.key === "Escape") {
    window.location.href = "index.html";
  }
});