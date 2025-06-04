document.addEventListener("DOMContentLoaded", function () {
  const userContainer = document.querySelector(".user-container");
  const dropdown = document.getElementById("dropdownContent");

  userContainer.addEventListener("click", async function(event) {
    event.preventDefault();

    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userEmail = localStorage.getItem("userEmail");

    if (isLoggedIn === "true" && userEmail) {
      try {
        const response = await fetch(`http://localhost:4000/usuarios/email/${userEmail}`);
        if (!response.ok) {
          throw new Error("Usuário não encontrado");
        }
        const user = await response.json();

        const userName = user.nome || "Usuário";
        const lastOrder = user.ultimo_pedido || "Nenhum pedido registrado";
        const favorites = user.favoritos || "Nenhum item favoritado";
        const savedCards = user.cartao || "";  // Ajusta conforme o nome no banco
        const address = user.endereco || "Endereço não cadastrado";

        const maskedCard = savedCards && savedCards.length >= 4 ? `**** **** **** ${savedCards.slice(-4)}` : "Nenhum cartão salvo";

        document.getElementById("userNameDisplay").innerText = `Nome: ${userName}`;
        document.getElementById("userEmailDisplay").innerText = `Email: ${user.email}`;
        document.getElementById("lastOrderDisplay").innerText = `Último pedido: ${lastOrder}`;
        document.getElementById("favoritesDisplay").innerText = `Favoritos: ${favorites}`;
        document.getElementById("savedCardsDisplay").innerText = `Cartões Salvos: ${maskedCard}`;
        document.getElementById("addressDisplay").innerText = `Endereço: ${address}`;

        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
      } catch (error) {
        console.error('Erro:', error.message);
        alert('Erro ao buscar informações do usuário.');
      }
    } else {
      window.location.href = "login.html";
    }
  });

  window.addEventListener("click", function (event) {
    if (!event.target.closest(".user-container")) {
      dropdown.style.display = "none";
    }
  });
});

async function deleteProfile() {
  if (confirm("Tem certeza que deseja deletar seu perfil? Essa ação não pode ser desfeita.")) {
    const userEmail = localStorage.getItem("userEmail");
    try {
      const response = await fetch(`http://localhost:4000/usuarios/email/${userEmail}`);
      if (!response.ok) {
        throw new Error('Usuário não encontrado.');
      }
      const user = await response.json();

      const deleteResponse = await fetch(`http://localhost:4000/usuarios/${user.id}`, {
        method: 'DELETE'
      });

      if (deleteResponse.ok) {
        alert("Perfil deletado com sucesso!");
        localStorage.clear();
        window.location.href = "index.html";
      } else {
        const errorData = await deleteResponse.json();
        alert("Erro ao deletar: " + errorData.error);
      }
    } catch (error) {
      alert('Erro ao deletar perfil: ' + error.message);
    }
  }
}
