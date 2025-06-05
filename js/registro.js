async function register() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const userName = document.getElementById('username').value.trim();
  const phone = document.getElementById('phone').value.trim();

  if (!email || !password || !userName || !phone) {
    alert('Preencha todos os campos.');
    return;
  }
  

  try {
    const response = await fetch('http://localhost:4000/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: userName, email, senha: password, telefone: phone })
    });

    if (response.ok) {
      alert('Cadastro realizado com sucesso! Faça login.');
      window.location.href = 'login.html';
    } else {
      const errorData = await response.json();
      alert('Erro: ' + errorData.error);
    }
  } catch (error) {
    alert('Erro na requisição: ' + error.message);
  }
}

// Voltar ao index.html ao apertar ESC
document.addEventListener('keydown', function(e) {
  if (e.key === "Escape") {
    window.location.href = "index.html";
  }
});

// Voltar ao index.html ao clicar fora da login-box
document.addEventListener('click', function(e) {
  const loginBox = document.querySelector('.login-box');
  if (loginBox && !loginBox.contains(e.target)) {
    window.location.href = "index.html";
  }
});
