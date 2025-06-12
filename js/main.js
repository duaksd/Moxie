let produtos = [];
let produtosExibidos = []; // NOVO: armazena o array atualmente exibido

document.addEventListener('DOMContentLoaded', () => {
  fetchProdutos();

  const searchBox = document.querySelector('.search-box');
  const searchInput = searchBox.querySelector('input');
  const searchButton = searchBox.querySelector('button[type="submit"]');

  searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    buscarProdutos(searchInput.value.trim());
  });

  searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      buscarProdutos(searchInput.value.trim());
    }
  });
});

async function fetchProdutos() {
  try {
    const response = await fetch('http://localhost:4000/produtos');
    if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
    produtos = await response.json();
    renderizarProdutos(produtos);
  } catch (erro) {
    console.error('Erro ao buscar produtos:', erro);
    exibirMensagemErro('Não foi possível carregar os produtos.');
  }
}

async function buscarProdutos(query) {
  try {
    let lista;
    if (!query) {
      lista = produtos;
    } else {
      const response = await fetch(`http://localhost:4000/produtos/buscar?nome=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
      lista = await response.json();
    }
    renderizarProdutos(lista);
  } catch (erro) {
    console.error('Erro ao buscar produtos:', erro);
    exibirMensagemErro('Erro ao buscar produtos.');
  }
}

function renderizarProdutos(lista) {
  produtosExibidos = lista; // Atualiza o array exibido
  const container = document.getElementById('produtos-container');
  container.innerHTML = '';

  if (!lista || lista.length === 0) {
    container.innerHTML = '<p>Nenhum produto encontrado.</p>';
    return;
  }

  lista.forEach((produto) => {
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
        <button onclick="redirecionarParaProduto('${produto.id}')">Comprar</button>
        <button class="add-to-cart" data-id="${produto.id}">Adicionar ao Carrinho</button>
      </div>
    `;
    container.innerHTML += produtoHTML;
  });
}

function redirecionarParaProduto(id) {
  const produto = produtosExibidos.find(p => String(p.id) === String(id));
  if (!produto) return;

  const queryString = `?imagem=${encodeURIComponent(produto.imagem_url)}&alt=${encodeURIComponent(produto.alt || produto.nome)}&nome=${encodeURIComponent(produto.nome)}&descricao=${encodeURIComponent(produto.descricao)}&preco=${encodeURIComponent(produto.preco)}&parcelamento=${encodeURIComponent(produto.parcelamento || '')}&tamanho=${encodeURIComponent(produto.tamanho || '')}&cor=${encodeURIComponent(produto.cor || '')}&genero=${encodeURIComponent(produto.genero || '')}`;

  window.location.href = `produto.html${queryString}`;
}

function exibirMensagemErro(msg) {
  const container = document.getElementById('produtos-container');
  container.innerHTML = `<p>${msg}</p>`;
}