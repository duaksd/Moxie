(function () {
  const icons = {
    success: '<i class="fa-solid fa-dumbbell"></i>',
    error: '<i class="fa-solid fa-circle-exclamation"></i>',
    warning: '<i class="fa-solid fa-triangle-exclamation"></i>',
    info: '<i class="fa-solid fa-info-circle"></i>'
  };

  function createAlertElement() {
    if (!document.getElementById('globalAlert')) {
      const alertDiv = document.createElement('div');
      alertDiv.id = 'globalAlert';
      alertDiv.className = 'alert hidden';
      alertDiv.setAttribute('role', 'alert');
      alertDiv.setAttribute('aria-live', 'assertive');
      alertDiv.setAttribute('aria-atomic', 'true');

      const iconSpan = document.createElement('span');
      iconSpan.id = 'alertIcon';

      const messageSpan = document.createElement('span');
      messageSpan.id = 'alertMessage';

      alertDiv.appendChild(iconSpan);
      alertDiv.appendChild(messageSpan);

      document.body.appendChild(alertDiv);
    }
  }

  // Função global
  window.showAlert = function (message, type = 'info') {
    createAlertElement();

    const alert = document.getElementById('globalAlert');
    const alertMessage = document.getElementById('alertMessage');
    const alertIcon = document.getElementById('alertIcon');

    alert.className = 'alert';
    alert.classList.add(type);
    alert.classList.add('show');
    alert.classList.remove('hidden');

    alertMessage.textContent = message;
    alertIcon.innerHTML = icons[type] || icons.info;

    clearTimeout(alert._timeout);
    alert._timeout = setTimeout(() => {
      alert.classList.remove('show');
      alert.classList.add('hidden');
    }, 4000);
  };

  // (Opcional) Substituir alert padrão
  window.alert = function (message) {
    showAlert(message, 'info');
  };
})();
