// Função para carregar o carrinho do localStorage
function carregarCarrinho() {
    const carrinhoSalvo = localStorage.getItem("carrinho");
    return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];
  }
  
  // Função para salvar o carrinho no localStorage
  function salvarCarrinho(carrinho) {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }
  
  // Função para calcular o total geral do carrinho
  function calcularTotalGeral(carrinho) {
    return carrinho
      .reduce((total, item) => {
        return (
          total +
          parseFloat(item.preco.replace("R$", "").replace(",", ".")) *
            (item.quantidade || 1)
        );
      }, 0)
      .toFixed(2);
  }
  
  // Lista de cupons válidos e seus descontos
  const cupons = {
    DESCONTO10: 0.1, // 10% de desconto
    DESCONTO20: 0.2, // 20% de desconto
    FRETEGRATIS: 0.0, // Frete grátis (sem desconto no total)
  };
  
  let descontoAplicado = 0; // Variável para armazenar o desconto atual
  
  // Função para calcular o total geral com desconto
  function calcularTotalComDesconto(carrinho) {
    const totalSemDesconto = calcularTotalGeral(carrinho);
    const totalComDesconto = (totalSemDesconto * (1 - descontoAplicado)).toFixed(2);
    return totalComDesconto;
  }
  
  // ✅ Função renderizarCarrinho única e corrigida
  function renderizarCarrinho() {
    const carrinho = carregarCarrinho();
    const carrinhoContainer = document.querySelector(".carrinho-itens");
    const totalGeralContainer = document.querySelector(".total-geral");
  
    carrinhoContainer.innerHTML = ""; // Limpa o conteúdo do carrinho
  
    carrinho.forEach((item, index) => {
      const descricaoLimitada = item.descricao.length > 50 
        ? item.descricao.substring(0, 50) + '...' 
        : item.descricao;
  
      const total = (
        parseFloat(item.preco.replace("R$", "").replace(",", ".")) *
        (item.quantidade || 1)
      ).toFixed(2);
  
      const itemHTML = `
        <tr>
          <td>
            <div class="produto">
              <img src="${item.imagem}" alt="${item.alt}" width="50">
              <div class="info">
                <div class="nome">${item.titulo}</div>
                <div class="categoria">${descricaoLimitada}</div>
              </div>
            </div>
          </td>
          <td>${item.preco}</td>
          <td>
            <div class="quant-produto">
              <button class="diminuir" data-id="${index}"><i class='bx bx-minus'></i></button>
              <span>${item.quantidade || 1}</span>
              <button class="aumentar" data-id="${index}"><i class='bx bx-plus'></i></button>
            </div>
          </td>
          <td>R$ ${total}</td>
          <td>
            <button class="remover-item" data-id="${index}"><i class='bx bx-trash'></i></button>
          </td>
        </tr>
      `;
      carrinhoContainer.innerHTML += itemHTML;
    });
  
    // Atualiza o total geral com desconto
    const totalComDesconto = calcularTotalComDesconto(carrinho);
    totalGeralContainer.textContent = `R$ ${totalComDesconto}`;
  }
  
  // Evento para alterar a quantidade ou remover itens do carrinho
  document.addEventListener("click", (event) => {
    const carrinho = carregarCarrinho();
    const id = event.target.closest("button")?.getAttribute("data-id");
  
    if (id !== null) {
      if (event.target.closest(".aumentar")) {
        carrinho[id].quantidade++;
      } else if (
        event.target.closest(".diminuir") &&
        carrinho[id].quantidade > 1
      ) {
        carrinho[id].quantidade--;
      } else if (event.target.closest(".remover-item")) {
        carrinho.splice(id, 1); // Remove o item do array
      }
  
      salvarCarrinho(carrinho);
      renderizarCarrinho();
    }
  });
  
  // Evento para aplicar o cupom
  document.getElementById("aplicar-cupom").addEventListener("click", () => {
    const inputCupom = document
      .getElementById("input-cupom")
      .value.trim()
      .toUpperCase();
    const mensagemCupom = document.getElementById("mensagem-cupom");
    const botaoAplicarCupom = document.getElementById("aplicar-cupom");
  
    if (cupons[inputCupom] !== undefined) {
      descontoAplicado = cupons[inputCupom];
      mensagemCupom.style.color = "green";
      mensagemCupom.textContent = "Cupom aplicado com sucesso!";
      mensagemCupom.style.display = "block";
      botaoAplicarCupom.style.display = "none";
    } else {
      descontoAplicado = 0;
      mensagemCupom.style.color = "red";
      mensagemCupom.textContent = "Cupom inválido!";
      mensagemCupom.style.display = "block";
    }
  
    renderizarCarrinho();
  });
  
  // Renderiza o carrinho ao carregar a página
  renderizarCarrinho();
  