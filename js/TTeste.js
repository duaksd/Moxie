function login() {
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

  const emailCorreto = localStorage.getItem('userEmail');
  const senhaCorreta = localStorage.getItem('userPassword');

  if (email === emailCorreto && password === senhaCorreta) {
    alert('Login realizado com sucesso!');
    window.location.href = 'dashboard.html'; // Redirecionar para a página principal após login
  } else {
    errorMsg.textContent = 'Email ou senha incorretos.';
  }
}
