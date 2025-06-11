// --- Cupons ---
const cupons = {
  DESCONTO10: 0.1, // 10% de desconto
  DESCONTO20: 0.2, // 20% de desconto
  FRETEGRATIS: 0.0 // Exemplo: pode tratar frete grátis separadamente
};
let descontoAplicado = 0;
let cupomAtual = "";

// --- Carrinho do banco ---
async function carregarCarrinhoDoBanco() {
  const usuarioStr = localStorage.getItem('usuario');
  if (!usuarioStr) return [];
  const usuario = JSON.parse(usuarioStr);

  try {
    const response = await fetch(`http://localhost:4000/carrinho?usuario_id=${usuario.id}`);
    if (!response.ok) throw new Error('Erro ao buscar carrinho do banco');
    const itens = await response.json();
    return itens.map(item => ({
      id: item.id,
      nome: item.produto?.nome || '',
      descricao: item.produto?.descricao || '',
      preco: item.produto ? `R$ ${parseFloat(item.produto.preco).toFixed(2)}` : '',
      imagem: item.produto?.imagem_url || '',
      alt: item.produto?.nome || '',
      quantidade: item.quantidade
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function atualizarQuantidadeItem(itemId, novaQuantidade) {
  await fetch(`http://localhost:4000/carrinho/${itemId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantidade: novaQuantidade })
  });
}

async function removerItemCarrinho(itemId) {
  await fetch(`http://localhost:4000/carrinho/${itemId}`, {
    method: 'DELETE'
  });
}

function calcularTotalGeral(carrinho) {
  return carrinho.reduce((total, item) => {
    const preco = parseFloat((item.preco || "0").replace("R$", "").replace(",", "."));
    return total + preco * (item.quantidade || 1);
  }, 0).toFixed(2);
}

function calcularTotalComDesconto(carrinho) {
  const totalSemDesconto = calcularTotalGeral(carrinho);
  const totalComDesconto = (totalSemDesconto * (1 - descontoAplicado)).toFixed(2);
  return totalComDesconto;
}

// --- Renderização e eventos ---
async function renderizarCarrinho() {
  const carrinho = await carregarCarrinhoDoBanco();
  const carrinhoContainer = document.querySelector(".carrinho-itens");
  const totalGeralContainer = document.querySelector(".total-geral");
  const subtotalContainer = document.querySelector(".subtotal");
  const mensagemCupom = document.getElementById("mensagem-cupom");
  const botaoAplicarCupom = document.getElementById("aplicar-cupom");
  const inputCupom = document.getElementById("input-cupom");

  carrinhoContainer.innerHTML = "";

  carrinho.forEach((item) => {
    const descricaoLimitada = item.descricao.length > 50
      ? item.descricao.substring(0, 50) + '...'
      : item.descricao;

    const total = (
      parseFloat((item.preco || "0").replace("R$", "").replace(",", ".")) *
      (item.quantidade || 1)
    ).toFixed(2);

    const itemHTML = `
      <tr data-carrinho-id="${item.id}">
        <td>
          <div class="produto">
            <img src="${item.imagem}" alt="${item.alt}" width="50">
            <div class="info">
              <div class="nome">${item.nome}</div>
              <div class="categoria">${descricaoLimitada}</div>
            </div>
          </div>
        </td>
        <td>${item.preco}</td>
        <td>
          <div class="quant-produto">
            <button class="diminuir" data-id="${item.id}"><i class='bx bx-minus'></i></button>
            <span>${item.quantidade || 1}</span>
            <button class="aumentar" data-id="${item.id}"><i class='bx bx-plus'></i></button>
          </div>
        </td>
        <td>R$ ${total}</td>
        <td>
          <button class="remover-item" data-id="${item.id}"><i class='bx bx-trash'></i></button>
        </td>
      </tr>
    `;
    carrinhoContainer.innerHTML += itemHTML;
  });

  // Subtotal e total
  const subtotal = calcularTotalGeral(carrinho);
  if (subtotalContainer) subtotalContainer.textContent = `R$ ${subtotal}`;
  const totalComDesconto = calcularTotalComDesconto(carrinho);
  if (totalGeralContainer) totalGeralContainer.textContent = `R$ ${totalComDesconto}`;

  // Exibe cupom aplicado, se houver
  if (cupomAtual) {
    mensagemCupom.style.color = "green";
    mensagemCupom.textContent = `Cupom "${cupomAtual}" aplicado!`;
    mensagemCupom.style.display = "block";
    botaoAplicarCupom.style.display = "none";
    inputCupom.disabled = true;
    // Botão para remover cupom
    if (!document.getElementById("remover-cupom")) {
      const btnRemover = document.createElement("button");
      btnRemover.id = "remover-cupom";
      btnRemover.textContent = "Remover cupom";
      btnRemover.onclick = () => {
        descontoAplicado = 0;
        cupomAtual = "";
        mensagemCupom.textContent = "";
        mensagemCupom.style.display = "none";
        botaoAplicarCupom.style.display = "inline-block";
        inputCupom.disabled = false;
        inputCupom.value = "";
        btnRemover.remove();
        renderizarCarrinho();
      };
      mensagemCupom.parentNode.appendChild(btnRemover);
    }
  } else {
    mensagemCupom.textContent = "";
    mensagemCupom.style.display = "none";
    botaoAplicarCupom.style.display = "inline-block";
    inputCupom.disabled = false;
    const btnRemover = document.getElementById("remover-cupom");
    if (btnRemover) btnRemover.remove();
  }

  // Listeners dos botões
  carrinhoContainer.querySelectorAll('.aumentar').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      const item = carrinho.find(i => i.id == id);
      await atualizarQuantidadeItem(id, (item.quantidade || 1) + 1);
      renderizarCarrinho();
    });
  });

  carrinhoContainer.querySelectorAll('.diminuir').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      const item = carrinho.find(i => i.id == id);
      if ((item.quantidade || 1) > 1) {
        await atualizarQuantidadeItem(id, item.quantidade - 1);
      } else {
        await removerItemCarrinho(id);
      }
      renderizarCarrinho();
    });
  });

  carrinhoContainer.querySelectorAll('.remover-item').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      await removerItemCarrinho(id);
      renderizarCarrinho();
    });
  });
}

// Evento para aplicar cupom
document.getElementById("aplicar-cupom").addEventListener("click", () => {
  const inputCupom = document.getElementById("input-cupom").value.trim().toUpperCase();
  const mensagemCupom = document.getElementById("mensagem-cupom");
  if (cupons[inputCupom] !== undefined) {
    descontoAplicado = cupons[inputCupom];
    cupomAtual = inputCupom;
    mensagemCupom.style.color = "green";
    mensagemCupom.textContent = "Cupom aplicado com sucesso!";
    mensagemCupom.style.display = "block";
  } else {
    descontoAplicado = 0;
    cupomAtual = "";
    mensagemCupom.style.color = "red";
    mensagemCupom.textContent = "Cupom inválido!";
    mensagemCupom.style.display = "block";
  }
  renderizarCarrinho();
});

// Evento para finalizar a compra
document.getElementById("finalizar-compra").addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = "finalizar-compra.html";
});

// Renderiza o carrinho ao carregar a página
renderizarCarrinho();