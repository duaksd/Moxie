let produtos = [];

document.addEventListener('DOMContentLoaded', () => {
  fetchProdutos();

  // Observa o DOM até o campo de busca aparecer
  const observer = new MutationObserver(() => {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        filtrarProdutos(e.target.value.trim());
      });
      observer.disconnect(); // Para de observar após encontrar
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
});

async function fetchProdutos() {
  try {
    const response = await fetch('http://localhost:4000/produtos');
    if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
    produtos = await response.json();
    renderizarProdutos(produtos.filter(p => (p.genero || '').toLowerCase() === 'feminino'));
  } catch (erro) {
    console.error('Erro ao buscar produtos:', erro);
    exibirMensagemErro('Não foi possível carregar os produtos.');
  }
}

function filtrarProdutos(query) {
  let femininos = produtos.filter(p => (p.genero || '').toLowerCase() === 'feminino');
  if (!query) {
    renderizarProdutos(femininos);
    return;
  }
  const filtrados = femininos.filter(produto =>
    produto.nome.toLowerCase().includes(query.toLowerCase())
  );
  renderizarProdutos(filtrados);
}

function renderizarProdutos(produtos) {
  const container = document.getElementById('produtos-container-feminino');
  container.innerHTML = '';

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

function redirecionarParaProduto(index) {
  const femininos = produtos.filter(p => (p.genero || '').toLowerCase() === 'feminino');
  const produto = femininos[index];
  if (!produto) return;

  const queryString = `?imagem=${encodeURIComponent(produto.imagem_url)}&alt=${encodeURIComponent(produto.alt || produto.nome)}&nome=${encodeURIComponent(produto.nome)}&descricao=${encodeURIComponent(produto.descricao)}&preco=${encodeURIComponent(produto.preco)}&parcelamento=${encodeURIComponent(produto.parcelamento || '')}&tamanho=${encodeURIComponent(produto.tamanho || '')}&cor=${encodeURIComponent(produto.cor || '')}&genero=${encodeURIComponent(produto.genero || '')}`;

  window.location.href = `produto.html${queryString}`;
}

function exibirMensagemErro(msg) {
  const container = document.getElementById('produtos-container-feminino');
  container.innerHTML = `<p>${msg}</p>`;
}