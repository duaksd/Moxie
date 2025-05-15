const produtos = [
    {
        imagem: "img/plus-size.jpeg",
        alt: "Conjunto Fitness Plus Size Preto com Detalhes Listrados",
        titulo: "Conjunto Fitness Plus Size Preto com Detalhes Listrados",
        descricao: "Conjunto de treino feminino de alta elasticidade, desenvolvido especialmente para conforto e estilo. O top de alças largas oferece suporte seguro, enquanto a legging de cintura alta valoriza a silhueta, com detalhes listrados que adicionam um toque de modernidade. Ideal para atividades físicas, caminhadas ou uso casual esportivo. Confeccionado com tecido respirável e de secagem rápida, perfeito para o seu dia a dia ativo.",
        preco: "R$ 115,99"
    },
    {
        imagem: "img/fem1.png",
        alt: "Shorts Fitness Feminino Moxie",
        titulo: "Shorts Fitness Feminino Moxie",
        descricao: "Shorts leve e confortável da linha Moxie, desenvolvido para atividades físicas intensas ou leisurely. Confeccionado com tecido de alta respirabilidade e elasticidade, garantindo liberdade de movimento e secagem rápida. Design estiloso na cor coral, com cintura elástica para melhor ajuste e conforto durante o uso.",
        preco: "R$ 78,89"
    },
    {
        imagem: "img/munhequeira.jpeg",
        alt: "Munhequeira PowerGrip (Par)",
        titulo: "Munhequeira PowerGrip (Par)",
        descricao: "Estabilidade e proteção em cada repetição. A Munhequeira PowerGrip foi desenvolvida para dar suporte aos punhos durante treinos de musculação, crossfit e levantamento de peso. Com ajuste em velcro e tecido elástico respirável, ela previne lesões sem limitar seus movimentos. Ideal para quem leva o treino a sério.",
        preco: "R$ 39,99"
    },
    {
        imagem: "img/mae-roupa.jpeg",
        alt: "Conjunto Fitness Mãe Atleta",
        titulo: "Conjunto Fitness Mãe Atleta",
        descricao: "Este conjunto feminino de roupas de fitness foi criado para celebrar a força, energia e conexão entre mães e seus filhos. Com tecido dry-fit leve, que proporciona conforto e liberdade de movimento, é perfeito para treinos em casa, na academia ou ao ar livre. O design moderno e estiloso incentiva uma rotina saudável e cheia de amor.",
        preco: "R$ 119,90"
    },
    {
        imagem: "img/camisa-preta.jpeg",
        alt: "Camiseta Esportiva Funcional Masculina",
        titulo: "Camiseta Esportiva Funcional Masculina",
        descricao: "Camiseta esportiva de tecido leve e respirável, com tecnologia de absorção de umidade, ideal para treinos na academia. Design moderno e confortável, com ajuste perfeito ao corpo e detalhes refletivos para maior segurança. Perfeita para quem busca desempenho e estilo durante as atividades físicas.",
        preco: "R$ 89,90"
    },
    {
        imagem: "img/fem2.png",
        alt: "Conjunto Fitness Feminino",
        titulo: "Conjunto Fitness Feminino Lana",
        descricao: "Conjunto de top e legging fitness feitos em tecido de alta performance, com acabamento confortável e resistente. O top oferece suporte perfeito para treinos de alta intensidade, enquanto a legging garante liberdade de movimento e ajuste perfeito ao corpo. Ideal para atividades na academia, yoga ou corrida, proporcionando estilo e conforto.",
        preco: "R$ 149,99"
    },
    {
        imagem: "img/camisa-longa.jpeg",
        alt: "Camisa de Manga Longa",
        titulo: "Camisa de Manga Longa",
        descricao: "Camisa de manga longa feita com tecido técnico de alta performance, ideal para treinos intensos e atividades ao ar livre. Possui design ajustado, respirável e com tecido que ajuda na gestão da umidade, proporcionando conforto e liberdade de movimento durante o exercício.",
        preco: "R$ 86,90"
    },
    {
        imagem: "img/alta-performance.jpeg",
        alt: "Camiseta masculina de alta performance",
        titulo: "Camiseta masculina de alta performance",
        descricao: "Camiseta masculina de alta performance, feita com tecido respirável, leve e elasticidade que acompanha seus movimentos durante os treinos. Design slim fit, ideal para quem busca conforto e estilo na academia ou na rotina esportiva. Detalhes modernos com acabamento de alta qualidade, perfeita para quem leva a sério sua performance.",
        preco: "R$ 98,90"
    },
    {
        imagem: "img/camisa-preta2.jpg",
        alt: "Camisa Preta Justa",
        titulo: "Camisa Preta Justa",
        descricao: "Camisa de compressão masculina de alta performance, confeccionada com tecido técnico de excelência que garante máxima respirabilidade, excelente elasticidade e suporte firme. Ideal para treinos intensos, corridas ou atividades que exigem rendimento máximo, proporcionando conforto e estabilidade durante toda a performance.",
        preco: "R$ 94,90"
    },
    {
        imagem: "img/casal-conjunto.jpeg",
        alt: "Conjunto Casual para Casal",
        titulo: "Conjunto Casual para Casal",
        descricao: "Conjunto de roupas fitness para casal, combina estilo e conforto. Tecido respirável, ótimo para treinos na academia ou ao ar livre. Disponível em várias cores e tamanhos.",
        preco: "R$ 199,90"
    },
    {
        imagem: "img/elastico.jpeg",
        alt: "Elástico de Resistência para Exercícios",
        titulo: "Elástico de Resistência para Exercícios",
        descricao: "Elástico de resistência de alta qualidade, ideal para treinos de força, alongamento e reabilitação. Confeito em material durável e flexível, disponível em diferentes níveis de intensidade para incrementar suas sessões de treino. Compacto e fácil de transportar, perfeito para usar em casa, no parque ou na academia.",
        preco: "R$ 49,90"
    },
    {
        imagem: "img/fem5.png",
        alt: "Macacão Street Moxie",
        titulo: "Macacão Fit Street Moxie",
        descricao: "Macacão feminino da linha Street Moxie, com design slim e acabamento em tecido stretch de alta resistência. Perfeito para um visual urbano, confortável e moderno, ideal para o dia a dia, treinos ou looks casuais. Cor preta, estilosa e versátil para quem busca praticidade com atitude.",
        preco: "R$ 179,90"
    },
    {
        imagem: "img/verde-jade.jpeg",
        alt: "Conjunto Fitness Verde Jade",
        titulo: "Conjunto Fitness Verde Jade",
        descricao: "Conjunto de roupa fitness composto por top e legging na cor verde jade vibrante. Feito com tecido de alta compressão, que oferece conforto, suporte e liberdade de movimento durante os exercícios. Design moderno e ajustado ao corpo, ideal para treinos na academia, corrida ou yoga. Perfeito para quem busca estilo e funcionalidade na hora de se exercitar.",
        preco: "R$ 129,90"
    },
    {
        imagem: "img/kit-portatil.jpeg",
        alt: "Kit de Treino Portátil para Fitness",
        titulo: "Kit de Treino Portátil para Fitness",
        descricao: "Leve seu treino para qualquer lugar com este kit completo de exercícios. Inclui um par de halteres ajustáveis, uma garrafa de água para hidratação, uma esteira dobrável e uma bolsa prática para transporte. Ideal para quem busca manter a rotina de exercícios em casa, na academia ou ao ar livre. Durável, fácil de transportar e perfeito para todos os níveis de condicionamento físico.",
        preco: "R$ 220,99"
    },
    {
        imagem: "img/masc-casual1.jpeg",
        alt: "Conjunto Esportivo Casual",
        titulo: "Conjunto Esportivo Casual",
        descricao: "Conjunto de camiseta e shorts super finos + camisa moletom ideal para treinos e atividades físicas. O tecido leve e respirável proporciona conforto e liberdade de movimento. Design moderno e estiloso, perfeito para quem busca praticidade e conforto no dia a dia. Disponível em várias cores.",
        preco: "R$ 144,90"
    }
];

const grid = document.querySelector('.grid');

const carrinho = JSON.parse(localStorage.getItem('carrinho')) || []; // Carrega o carrinho do localStorage ou inicializa vazio

const container = document.getElementById('produtos-container');

// Gera os produtos dinamicamente
produtos.forEach((produto, index) => {
    const descricaoCurta = produto.descricao.length > 100 
        ? produto.descricao.substring(0, 100) + '...' 
        : produto.descricao; // Limita a descrição a 100 caracteres

    const produtoHTML = `
        <div class="produto">
            <img src="${produto.imagem}" alt="${produto.alt}">
            <h2>${produto.titulo}</h2>
            <p>${descricaoCurta}</p> <!-- Exibe a descrição curta -->
            <p class="preco">${produto.preco}</p>
            <button onclick="redirecionarParaProduto(${index})">Comprar</button>
        </div>
    `;
    container.innerHTML += produtoHTML;
});

// Função para redirecionar para a página do produto
function redirecionarParaProduto(index) {
    const produto = produtos[index];
    const queryString = `?imagem=${encodeURIComponent(produto.imagem)}&alt=${encodeURIComponent(produto.alt)}&titulo=${encodeURIComponent(produto.titulo)}&descricao=${encodeURIComponent(produto.descricao)}&preco=${encodeURIComponent(produto.preco)}`;
    window.location.href = `produto.html${queryString}`;
}

// Adicionar evento aos botões "Comprar" add-to-cart <button class="add-to-cart" data-id="${index}">Comprar</button>
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