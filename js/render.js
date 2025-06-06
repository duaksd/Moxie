document.addEventListener('DOMContentLoaded', () => {
  fetchProdutos();
});

async function fetchProdutos() {
  try {
    const response = await fetch('http://localhost:4000/produtos');

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const produtos = await response.json();
    renderizarProdutos(produtos);
  } catch (erro) {
    console.error('Erro ao buscar produtos:', erro);
    exibirMensagemErro('Não foi possível carregar os produtos.');
  }
}

function renderizarProdutos(produtos) {
  const container = document.getElementById('produtos-container');
  container.innerHTML = ''; // Limpa antes de inserir

  if (!produtos || produtos.length === 0) {
    container.innerHTML = '<p>Nenhum produto encontrado.</p>';
    return;
  }

  produtos.forEach(produto => {
    const card = document.createElement('div');
    card.classList.add('produto-card');

    card.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}" class="produto-imagem" />
      <h3 class="produto-nome">${produto.nome}</h3>
      <p class="produto-descricao">${produto.descricao}</p>
      <p class="produto-preco">R$ ${produto.preco.toFixed(2)}</p>
      <p class="produto-estoque">Estoque: ${produto.estoque}</p>
      <button class="btn-adicionar">Adicionar ao Carrinho</button>
    `;

    container.appendChild(card);
  });
}

function exibirMensagemErro(mensagem) {
  const container = document.getElementById('produtos-container');
  container.innerHTML = `<p class="erro">${mensagem}</p>`;
}
