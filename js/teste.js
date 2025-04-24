const produtos = [
    {
        imagem: "img/masc1.png",
        alt: "Calça Legging Bicolor",
        titulo: "Calça Legging Bicolor",
        descricao: "Desenvolvida em alta qualidade com cortes que valorizam as curvas do seu corpo e ótimo ajuste.",
        preco: "R$ 40,41"
    },
    {
        imagem: "img/fem1.png",
        alt: "Roupas",
        titulo: "Roupa",
        descricao: "Para treino intenso.",
        preco: "R$ 299,99"
    },
    {
        imagem: "img/masc10.png",
        alt: "Tênis Esportivo",
        titulo: "Tênis Esportivo",
        descricao: "Leve e resistente.",
        preco: "R$ 299,99"
    },
    {
        imagem: "img/fem10.png",
        alt: "Calça Legging Bicolor",
        titulo: "Calça Legging Bicolor",
        descricao: "Desenvolvida em alta qualidade com cortes que valorizam as curvas do seu corpo e ótimo ajuste.",
        preco: "R$ 40,41"
    },
    {
        imagem: "img/masc2.png",
        alt: "Roupas",
        titulo: "Roupa",
        descricao: "Para treino intenso.",
        preco: "R$ 299,99"
    },
    {
        imagem: "img/fem2.png",
        alt: "Tênis Esportivo",
        titulo: "Tênis Esportivo",
        descricao: "Leve e resistente.",
        preco: "R$ 299,99"
    },
    {
        imagem: "img/masc3.png",
        alt: "Calça Legging Bicolor",
        titulo: "Calça Legging Bicolor",
        descricao: "Desenvolvida em alta qualidade com cortes que valorizam as curvas do seu corpo e ótimo ajuste.",
        preco: "R$ 40,41"
    },
    {
        imagem: "img/fem3.png",
        alt: "Roupas",
        titulo: "Roupa",
        descricao: "Para treino intenso.",
        preco: "R$ 299,99"
    },
    {
        imagem: "img/masc4.png",
        alt: "Tênis Esportivo",
        titulo: "Tênis Esportivo",
        descricao: "Leve e resistente.",
        preco: "R$ 299,99"
    },
    {
        imagem: "img/fem4.png",
        alt: "Tênis Esportivo",
        titulo: "Tênis Esportivo",
        descricao: "Leve e resistente.",
        preco: "R$ 299,99"
    },
    {
        imagem: "img/masc6.png",
        alt: "Tênis Esportivo",
        titulo: "Tênis Esportivo",
        descricao: "Leve e resistente.",
        preco: "R$ 299,99"
    },
    {
        imagem: "img/fem5.png",
        alt: "Tênis Esportivo",
        titulo: "Tênis Esportivo",
        descricao: "Leve e resistente.",
        preco: "R$ 299,99"
    }
];

const grid = document.querySelector('.grid');

produtos.forEach((produto, index) => {
    const produtoHTML = `
        <div class="produto">
            <img src="${produto.imagem}" alt="${produto.alt}">
            <h3>${produto.titulo}</h3>
            <p>${produto.descricao}</p>
            <h2 class="preco">${produto.preco}</h2>
            <button class="add-to-cart" data-id="${index}">Comprar</button>
        </div>
    `;
    grid.innerHTML += produtoHTML;
});

const carrinho = [];

// Adicionar evento aos botões "Comprar"
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart')) {
        const produtoId = event.target.getAttribute('data-id');
        const produtoSelecionado = produtos[produtoId];

        // Adicionar o produto ao carrinho
        carrinho.push(produtoSelecionado);

        // Exibir mensagem de sucesso
        alert(`${produtoSelecionado.titulo} foi adicionado ao carrinho!`);
        console.log(carrinho); // Para verificar os itens no console
    }
});

function renderizarCarrinho() {
    const carrinhoContainer = document.querySelector('.carrinho-itens');
    carrinhoContainer.innerHTML = '';

    carrinho.forEach((item, index) => {
        const itemHTML = `
            <li>
                <img src="${item.imagem}" alt="${item.alt}" width="50">
                <span>${item.titulo}</span>
                <span>${item.preco}</span>
                <button class="remover-item" data-id="${index}">Remover</button>
            </li>
        `;
        carrinhoContainer.innerHTML += itemHTML;
    });
}

// Atualizar o carrinho ao adicionar itens
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart')) {
        renderizarCarrinho();
    }
});

// Remover itens do carrinho
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('remover-item')) {
        const itemId = event.target.getAttribute('data-id');
        carrinho.splice(itemId, 1); // Remove o item do array
        renderizarCarrinho(); // Atualiza a exibição do carrinho
    }
});

function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function carregarCarrinho() {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    if (carrinhoSalvo) {
        carrinho.push(...JSON.parse(carrinhoSalvo));
        renderizarCarrinho();
    }
}

// Chamar ao carregar a página
carregarCarrinho();