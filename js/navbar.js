function toggleDropdown(event) {
    event.preventDefault();
    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
        window.location.href = "login.html";
        return;
    }

    const dropdown = document.getElementById("dropdownContent");
    dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";

    if (dropdown.style.display === "block") {
        carregarDadosUsuario();
    }
}

function carregarDadosUsuario() {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) return;

    fetch(`http://localhost:4000/usuarios/email/${userEmail}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("userNameDisplay").innerHTML = `<strong>Nome:</strong> ${data.nome}`;
            document.getElementById("userEmailDisplay").innerHTML = `<strong>Email:</strong> ${data.email}`;
            document.getElementById("lastOrderDisplay").innerHTML = `<strong>Último pedido:</strong> ${data.ultimoPedido || 'Nenhum'}`;
            document.getElementById("favoritesDisplay").innerHTML = `<strong>Favoritos:</strong> ${data.favoritos?.length || 0}`;
            document.getElementById("savedCardsDisplay").innerHTML = `<strong>Cartões Salvos:</strong> ${data.cartoes?.length || 0}`;
            document.getElementById("addressDisplay").innerHTML = `<strong>Endereço:</strong> ${data.endereco || 'Não informado'}`;
        })
        .catch(error => console.error("Erro ao buscar usuário:", error));
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
  window.location.href = "login.html";
}



function deleteProfile() {
    console.log("Função de deletar perfil a implementar.");
}

window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (token && usuario) {
    document.getElementById("userNameDisplay").innerHTML = `<strong>Nome:</strong> ${usuario.nome}`;
    document.getElementById("userEmailDisplay").innerHTML = `<strong>Email:</strong> ${usuario.email}`;
    // Pode buscar mais dados via /usuarios/perfil com token se quiser
  }
});
