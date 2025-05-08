function register() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorMsg = document.getElementById('errorMsg');

  errorMsg.textContent = '';

  if (!email || !password) {
    errorMsg.textContent = 'Preencha todos os campos.';
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errorMsg.textContent = 'Por favor, insira um email válido.';
    return;
  }

  // Salvar no localStorage
  localStorage.setItem('userEmail', email);
  localStorage.setItem('userPassword', password);

  alert('Cadastro realizado com sucesso! Você será redirecionado para a página de login.');
  window.location.href = 'index.html'; // Redirecionar para a página de login
}
