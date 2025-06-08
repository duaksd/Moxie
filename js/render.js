import { addCarrinho } from './addCarrinho.js'

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

// Função para redirecionar para a página do produto
function renderizarProdutos(produtos) {
  const container = document.getElementById('produtos-container');
  container.innerHTML = ''; // Limpa o conteúdo anterior

  if (!produtos || produtos.length === 0) {
    container.innerHTML = '<p>Nenhum produto encontrado.</p>';
    return;
  }

  produtos.forEach((produto, index) => {
    const descricaoCurta = produto.descricao.length > 100 
      ? produto.descricao.substring(0, 100) + '...'
      : produto.descricao;

    const queryString = `?imagem=${encodeURIComponent(produto.imagem_url)}&alt=${encodeURIComponent(produto.alt || produto.nome)}&nome=${encodeURIComponent(produto.nome)}&descricao=${encodeURIComponent(produto.descricao)}&preco=${encodeURIComponent(produto.preco)}&parcelamento=${encodeURIComponent(produto.parcelamento || '')}&tamanho=${encodeURIComponent(produto.tamanho || '')}&cor=${encodeURIComponent(produto.cor || '')}&genero=${encodeURIComponent(produto.genero || '')}`;

    const produtoHTML = `
      <div class="produto">
        <a href="produto.html${queryString}">
          <img src="${produto.imagem_url}" alt="${produto.alt || produto.nome}">
        </a>
        <h2>${produto.nome}</h2>
        <p>${descricaoCurta}</p>
        <p class="preco">R$ ${Number(produto.preco).toFixed(2)}</p>
        <button onclick="redirecionarParaProduto(${index})">Comprar</button>
        <button class="add-to-cart" data-id="${index}">Adicionar ao Carrinho</button>
      </div>
    `;

    container.innerHTML += produtoHTML;
  });
}

function exibirMensagemErro(mensagem) {
  const container = document.getElementById('produtos-container');
  container.innerHTML = `<p class="erro">${mensagem}</p>`;
}

// Dentro do evento de clique no botão:
botao.addEventListener('click', () => {
  addCarrinho(produto);
});