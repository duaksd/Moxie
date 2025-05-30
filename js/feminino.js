function renderizarProdutosFemininos() {
    const container = document.getElementById('produtos-container-feminino');
    if (!container) return;
    container.innerHTML = '';

    const produtosFemininos = produtos.filter(produto => produto.genero === 'feminino');

    produtosFemininos.forEach((produto, index) => {
        const descricaoCurta = produto.descricao && produto.descricao.length > 100
            ? produto.descricao.substring(0, 100) + '...'
            : produto.descricao || '';

        const queryString = `?imagem=${encodeURIComponent(produto.imagem)}&alt=${encodeURIComponent(produto.alt)}&nome=${encodeURIComponent(produto.nome)}&descricao=${encodeURIComponent(produto.descricao)}&preco=${encodeURIComponent(produto.preco)}&parcelamento=${encodeURIComponent(produto.parcelamento || '')}&tamanho=${encodeURIComponent(produto.tamanho || '')}&cor=${encodeURIComponent(produto.cor || '')}&genero=${encodeURIComponent(produto.genero || '')}`;

        const produtoHTML = `
            <div class="produto">
                <a href="produto.html${queryString}">
                    <img src="${produto.imagem}" alt="${produto.alt}">
                </a>
                <h2>${produto.nome}</h2>
                <p>${descricaoCurta}</p>
                <p class="preco">${produto.preco}</p>
                <button onclick="redirecionarParaProduto(${index})">Comprar</button>
                <button class="add-to-cart" data-id="${index}">Adicionar ao Carrinho</button>
            </div>
        `;
        container.innerHTML += produtoHTML;
    });
}

function renderizarProdutosMasculinos() {
    const container = document.getElementById('produtos-container-masculino');
    if (!container) return;
    container.innerHTML = '';

    const produtosMasculinos = produtos.filter(produto => produto.genero === 'masculino');

    produtosMasculinos.forEach((produto, index) => {
        const descricaoCurta = produto.descricao && produto.descricao.length > 100
            ? produto.descricao.substring(0, 100) + '...'
            : produto.descricao || '';

        const queryString = `?imagem=${encodeURIComponent(produto.imagem)}&alt=${encodeURIComponent(produto.alt)}&nome=${encodeURIComponent(produto.nome)}&descricao=${encodeURIComponent(produto.descricao)}&preco=${encodeURIComponent(produto.preco)}&parcelamento=${encodeURIComponent(produto.parcelamento || '')}&tamanho=${encodeURIComponent(produto.tamanho || '')}&cor=${encodeURIComponent(produto.cor || '')}&genero=${encodeURIComponent(produto.genero || '')}`;

        const produtoHTML = `
            <div class="produto">
                <a href="produto.html${queryString}">
                    <img src="${produto.imagem}" alt="${produto.alt}">
                </a>
                <h2>${produto.nome}</h2>
                <p>${descricaoCurta}</p>
                <p class="preco">${produto.preco}</p>
                <button onclick="redirecionarParaProduto(${index})">Comprar</button>
                <button class="add-to-cart" data-id="${index}">Adicionar ao Carrinho</button>
            </div>
        `;
        container.innerHTML += produtoHTML;
    });
}

// Para renderizar feminino:
renderizarProdutosFemininos();

// Para renderizar masculino (em outra página ou ao trocar o container):
renderizarProdutosMasculinos();