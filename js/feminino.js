function renderizarProdutosFemininos() {
    const container = document.getElementById('produtos-container-feminino');
    if (!container) return;
    container.innerHTML = '';

    const produtosFemininos = produtos.filter(produto => produto.genero === 'feminino');

    produtosFemininos.forEach((produto) => {
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
                <button onclick="redirecionarParaProduto(${produto.id})">Comprar</button>
                <button class="add-to-cart" data-id="${produto.id}">Adicionar ao Carrinho</button>
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

    produtosMasculinos.forEach((produto) => {
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
                <button onclick="redirecionarParaProduto(${produto.id})">Comprar</button>
                <button class="add-to-cart" data-id="${produto.id}">Adicionar ao Carrinho</button>
            </div>
        `;
        container.innerHTML += produtoHTML;
    });
}

// Adicionar evento aos botões "Adicionar ao Carrinho"
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart')) {
        const produtoId = parseInt(event.target.getAttribute('data-id')); // Converte para número
        const produtoSelecionado = produtos.find(produto => produto.id === produtoId); // Busca pelo ID

        if (!produtoSelecionado) {
            alert('Erro ao adicionar o produto ao carrinho.');
            return;
        }

        // Verifica se o produto já está no carrinho
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        const itemExistente = carrinho.find(item => item.id === produtoSelecionado.id); // Verifica pelo ID
        if (itemExistente) {
            itemExistente.quantidade = (itemExistente.quantidade || 1) + 1; // Incrementa a quantidade
        } else {
            carrinho.push({ ...produtoSelecionado, quantidade: 1 }); // Adiciona o produto ao carrinho
        }

        // Salva o carrinho atualizado no localStorage
        localStorage.setItem('carrinho', JSON.stringify(carrinho));

        // Exibe uma mensagem de sucesso
        alert(`${produtoSelecionado.nome} foi adicionado ao carrinho!`);
    }
});

// Para renderizar feminino:
renderizarProdutosFemininos();

// Para renderizar masculino:
renderizarProdutosMasculinos();
