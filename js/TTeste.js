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
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', user.nome);
      localStorage.setItem('userEmail', user.email);
      window.location.href = 'usuariologado.html';
    } else {
      const errorData = await response.json();
      alert('Erro: ' + errorData.error);
    }
  } catch (error) {
    alert('Erro na requisição: ' + error.message);
  }
}




// function login() {
//   const email = document.getElementById('email').value.trim();
//   const password = document.getElementById('password').value.trim();

//   const savedEmail = localStorage.getItem('userEmail');
//   const savedPassword = localStorage.getItem('userPassword');

//   if (!email || !password) {
//     alert('Preencha todos os campos.');
//     return;
//   }

//   if (email === savedEmail && password === savedPassword) {
//     localStorage.setItem('isLoggedIn', 'true');
//     window.location.href = 'usuariologado.html'; //redireciona para a página inicial após o login
//   } else {
//     alert('Email ou senha incorretos.');
//   }
// }

  // Voltar ao index.html ao apertar ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === "Escape") {
      window.location.href = "index.html";
    }
  });

  // // Voltar ao index.html ao clicar fora da login-box
  // document.addEventListener('click', function(e) {
  //   const loginBox = document.querySelector('.login-box');
  //   if (loginBox && !loginBox.contains(e.target)) {
  //     window.location.href = "index.html";
  //   }
  // });