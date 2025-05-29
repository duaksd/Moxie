document.addEventListener('DOMContentLoaded', () => {
    const searchBox = document.querySelector('.search-box');
    const searchInput = searchBox.querySelector('input');
    const searchButton = searchBox.querySelector('button[type="submit"]');
    const produtosContainer = document.getElementById('produtos-container');

    function renderProdutos(lista) {
        produtosContainer.innerHTML = '';
        if (!lista || lista.length === 0) {
            produtosContainer.innerHTML = '<p>Nenhum produto encontrado.</p>';
            return;
        }
        lista.forEach((produto, index) => {
            const descricaoCurta = produto.descricao.length > 100 
                ? produto.descricao.substring(0, 100) + '...' 
                : produto.descricao;
            const produtoHTML = `
                <div class="produto">
                    <a href="produto.html?imagem=${encodeURIComponent(produto.imagem)}&alt=${encodeURIComponent(produto.alt)}&nome=${encodeURIComponent(produto.nome)}&descricao=${encodeURIComponent(produto.descricao)}&preco=${encodeURIComponent(produto.preco)}&parcelamento=${encodeURIComponent(produto.parcelamento || '')}&tamanho=${encodeURIComponent(produto.tamanho || '')}&cor=${encodeURIComponent(produto.cor || '')}&genero=${encodeURIComponent(produto.genero || '')}">
                        <img src="${produto.imagem}" alt="${produto.alt}">
                    </a>
                    <h2>${produto.nome}</h2>
                    <p>${descricaoCurta}</p>
                    <p class="preco">${produto.preco}</p>
                    <button onclick="redirecionarParaProduto(${index})">Comprar</button>
                    <button class="add-to-cart" data-id="${index}">Adicionar ao Carrinho</button>
                </div>
            `;
            produtosContainer.innerHTML += produtoHTML;
        });
    }

    // Exibir todos ao carregar
    if (window.produtos) renderProdutos(window.produtos);

    // Buscar ao clicar no botão
    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        buscar();
    });

    // Buscar ao pressionar Enter
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            buscar();
        }
    });

    function buscar() {
        const query = searchInput.value.trim().toLowerCase();
        if (!query) {
            renderProdutos(window.produtos);
            return;
        }
        const filtrados = window.produtos.filter(p =>
            p.nome.toLowerCase().includes(query)
        );
        renderProdutos(filtrados);
    }
});