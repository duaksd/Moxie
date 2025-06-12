document.addEventListener("DOMContentLoaded", () => {
  const pedidosContainer = document.querySelector("tbody");

  // Carregar pedidos do localStorage
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

  if (pedidos.length === 0) {
    pedidosContainer.innerHTML = '<tr><td colspan="6" style="text-align:center; color:#777;">Você ainda não realizou nenhum pedido.</td></tr>';
    return;
  }

  pedidos.forEach((pedido) => {
    const dataFormatada = new Date(pedido.data).toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    });

    const pedidoHTML = `
      <tr>
        <td>
          <a href="#" class="pedido-link">${pedido.id}</a>
          <time datetime="${pedido.data}" class="pedido-date">${dataFormatada}</time>
        </td>
        <td class="valor">${pedido.total}</td>
        <td>
          <div class="status" aria-label="Pedido finalizado">
            <span class="material-icons" aria-hidden="true" title="Pedido finalizado">check_circle</span>
            Pedido finalizado
          </div>
        </td>
        <td class="mensagem">Obrigado por comprar com a Moxie!</td>
        <td>
          <button class="btn-detalhes" aria-label="Ver detalhes do pedido ${pedido.id}">Ver Detalhes</button>
        </td>
      </tr>
    `;
    pedidosContainer.innerHTML += pedidoHTML;
  });
});
