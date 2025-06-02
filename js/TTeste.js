async function login() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!email || !password) {
    alert('Preencha todos os campos.');
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/usuarios/email/${email}`);
    const user = await response.json();

    if (response.ok) {
      if (user.senha === password) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', user.nome);
        localStorage.setItem('userEmail', user.email);
        window.location.href = 'usuariologado.html';
      } else {
        alert('Senha incorreta!');
      }
    } else {
      alert('Usuário não encontrado!');
    }
  } catch (error) {
    alert('Erro na requisição: ' + error.message);
  }
}


    function login() {
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();

      const savedEmail = localStorage.getItem('userEmail');
      const savedPassword = localStorage.getItem('userPassword');

      if (!email || !password) {
        alert('Preencha todos os campos.');
        return;
      }

      if (email === savedEmail && password === savedPassword) {
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'usuariologado.html'; //redireciona para a página inicial após o login
      } else {
        alert('Email ou senha incorretos.');
      }
    }
