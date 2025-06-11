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
      body: JSON.stringify({ email, senha })
    });

    const data = await response.json();

    // Só salva se houver usuário válido
    if (response.ok && data.usuario) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('usuario', JSON.stringify(data.usuario));
      alert('Login realizado com sucesso!');
      window.location.href = 'index.html';
    } else {
      // Limpa qualquer valor inválido
      localStorage.removeItem('usuario');
      localStorage.removeItem('token');
      alert('Erro: ' + (data.error || 'Verifique seus dados.'));
    }
  } catch (error) {
    alert('Erro na requisição: ' + error.message);
  }
}

// ESC para voltar ao index
document.addEventListener('keydown', function(e) {
  if (e.key === "Escape") {
    window.location.href = "index.html";
  }
});

// // Clique fora da login-box para voltar ao index
// document.addEventListener('click', function(e) {
//   const loginBox = document.querySelector('.login-box');
//   if (loginBox && !loginBox.contains(e.target)) {
//     window.location.href = "index.html";
//   }
// });