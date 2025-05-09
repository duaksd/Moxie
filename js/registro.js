function register() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!email || !password) {
    alert('Preencha todos os campos.');
    return;
  }

  localStorage.setItem('userEmail', email);
  localStorage.setItem('userPassword', password);
  alert('Cadastro realizado! Faça login.');
  window.location.href = 'login.html';
}
