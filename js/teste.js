const produtos = [
    {
        imagem: "img/masc1.png",
        alt: "Calça Legging Bicolor",
        titulo: "Calça Legging Bicolor",
        descricao: "Desenvolvida em alta qualidade com cortes que valorizam as curvas do seu corpo e ótimo ajuste.",
        preco: "R$ 97,99"
    },
    {
        imagem: "img/fem1.png",
        alt: "Top Esportivo",
        titulo: "Top Esportivo",
        descricao: "Para treino intenso.",
        preco: "R$ 78,89"
    },
    {
        imagem: "img/masc10.png",
        alt: "Munhequeira de pulso",
        titulo: "Munhequeira ",
        descricao: "Leve e resistente.",
        preco: "R$ 299,99"
    },
    {
        imagem: "img/fem10.png",
        alt: "Top de Academia",
        titulo: "Top de Academia",
        descricao: "Desenvolvida em alta qualidade com cortes que valorizam as curvas do seu corpo e ótimo ajuste.",
        preco: "R$ 45,41"
    },
    {
        imagem: "img/masc2.png",
        alt: "Camisa Preta Leve",
        titulo: "Camisa Preta Leve",
        descricao: "Para treino intenso.",
        preco: "R$ 80,59"
    },
    {
        imagem: "img/fem2.png",
        alt: "Conjunto Fitness Feminino",
        titulo: "Conjunto Fitness Feminino",
        descricao: "Leve e resistente.",
        preco: "R$ 149,99"
    },
    {
        imagem: "img/masc3.png",
        alt: "Camisa de Manga longa",
        titulo: "Camisa de Manga longa",
        descricao: "Desenvolvida em alta qualidade com cortes que valorizam e destacam os musculos.",
        preco: "R$ 49,81"
    },
    {
        imagem: "img/fem3.png",
        alt: "Regata Feminina",
        titulo: "Regata Feminina",
        descricao: "Para treino intenso.",
        preco: "R$ 60,29"
    },
    {
        imagem: "img/masc4.png",
        alt: "Camisa Preta Justa",
        titulo: "Camisa Preta Justa",
        descricao: "Leve e resistente não mancha.",
        preco: "R$ 79,79"
    },
    {
        imagem: "img/fem4.png",
        alt: "Cunjunto Casual Feminino",
        titulo: "Cunjunto Casual Feminino",
        descricao: "Confortável ideal para caminhadas.",
        preco: "R$ 81,95"
    },
    {
        imagem: "img/masc6.png",
        alt: "Elastico de Academia",
        titulo: "Elastico de Academia",
        descricao: "Resistente e flexivel.",
        preco: "R$ 37,69"
    },
    {
        imagem: "img/fem5.png",
        alt: "Conjunto Moletom Fitness Feminino",
        titulo: "Conjunto Moletom Fitness Feminino",
        descricao: "Leve e resistente.",
        preco: "R$ 199,99"
    }
];

const grid = document.querySelector('.grid');

const carrinho = JSON.parse(localStorage.getItem('carrinho')) || []; // Carrega o carrinho do localStorage ou inicializa vazio

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

// Adicionar evento aos botões "Comprar"
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart')) {
        const produtoId = event.target.getAttribute('data-id');
        const produtoSelecionado = produtos[produtoId];

        // Verifica se o produto já está no carrinho
        const itemExistente = carrinho.find(item => item.titulo === produtoSelecionado.titulo);
        if (itemExistente) {
            itemExistente.quantidade = (itemExistente.quantidade || 1) + 1; // Incrementa a quantidade
        } else {
            carrinho.push({ ...produtoSelecionado, quantidade: 1 }); // Adiciona o produto ao carrinho
        }

        // Salva o carrinho atualizado no localStorage
        localStorage.setItem('carrinho', JSON.stringify(carrinho));

        // Exibe uma mensagem de sucesso
        alert(`${produtoSelecionado.titulo} foi adicionado ao carrinho!`);
    }


});