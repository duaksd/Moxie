const produtos = [
    {
        imagem: "img/plus-size.jpeg",
        alt: "Conjunto Fitness Plus Size Preto",
        nome: "Conjunto Fitness Plus Size Preto com Detalhes Listrados",
        descricao: "Conjunto de treino feminino de alta elasticidade, desenvolvido especialmente para conforto e estilo. O top de alças largas oferece suporte seguro, enquanto a legging de cintura alta valoriza a silhueta, com detalhes listrados que adicionam um toque de modernidade. Ideal para atividades físicas, caminhadas ou uso casual esportivo. Confeccionado com tecido respirável e de secagem rápida, perfeito para o seu dia a dia ativo.",
        preco: "R$ 115,99",
        parcelamento: "3x de R$ 38,66",
        tamanho: "GG",
        genero: "feminino",
        cor: "",
        estoque: 0
    },
    {
        imagem: "img/fem1.png",
        alt: "Shorts Fitness Feminino Moxie",
        nome: "Shorts Fitness Feminino Moxie",
        descricao: "Shorts leve e confortável da linha Moxie, desenvolvido para atividades físicas intensas ou leisurely. Confeccionado com tecido de alta respirabilidade e elasticidade, garantindo liberdade de movimento e secagem rápida. Design estiloso na cor coral, com cintura elástica para melhor ajuste e conforto durante o uso.",
        preco: "R$ 78,89",
        parcelamento: "2x de R$ 39,45",
        tamanho: "P",
        genero: "feminino",
        cor: "coral",
        estoque: 10
    },
    {
        imagem: "img/munhequeira.jpeg",
        alt: "Munhequeira PowerGrip (Par)",
        nome: "Munhequeira PowerGrip (Par)",
        descricao: "Estabilidade e proteção em cada repetição. A Munhequeira PowerGrip foi desenvolvida para dar suporte aos punhos durante treinos de musculação, crossfit e levantamento de peso. Com ajuste em velcro e tecido elástico respirável, ela previne lesões sem limitar seus movimentos. Ideal para quem leva o treino a sério.",
        preco: "R$ 39,99",
        parcelamento: "2x de R$ 20,00",
        tamanho: "",
        genero: "",
        cor: "",
        estoque: 0
    },
    {
        imagem: "img/mae-roupa.jpeg",
        alt: "Conjunto Fitness Mãe Atleta",
        nome: "Conjunto Fitness Mãe Atleta",
        descricao: "Este conjunto feminino de roupas de fitness foi criado para celebrar a força, energia e conexão entre mães e seus filhos. Com tecido dry-fit leve, que proporciona conforto e liberdade de movimento, é perfeito para treinos em casa, na academia ou ao ar livre. O design moderno e estiloso incentiva uma rotina saudável e cheia de amor.",
        preco: "R$ 119,90",
        parcelamento: "3x de R$ 39,97",
        tamanho: "P",
        genero: "feminino",
        cor: "preto",
        estoque: 10
    },
    {
        imagem: "img/camisa-preta.jpeg",
        alt: "Camiseta Esportiva Funcional Masculina",
        nome: "Camiseta Esportiva Funcional Masculina",
        descricao: "Camiseta esportiva de tecido leve e respirável, com tecnologia de absorção de umidade, ideal para treinos na academia. Design moderno e confortável, com ajuste perfeito ao corpo e detalhes refletivos para maior segurança. Perfeita para quem busca desempenho e estilo durante as atividades físicas.",
        preco: "R$ 89,90",
        parcelamento: "2x de R$ 44,95",
        tamanho: "G",
        genero: "masculino",
        cor: "",
        estoque: 0
    },
    {
        imagem: "img/fem2.png",
        alt: "Conjunto Fitness Feminino Lana",
        nome: "Conjunto Fitness Feminino Lana",
        descricao: "Conjunto de top e legging fitness feitos em tecido de alta performance, com acabamento confortável e resistente. O top oferece suporte perfeito para treinos de alta intensidade, enquanto a legging garante liberdade de movimento e ajuste perfeito ao corpo. Ideal para atividades na academia, yoga ou corrida, proporcionando estilo e conforto.",
        preco: "R$ 149,99",
        parcelamento: "3x de R$ 50,00",
        tamanho: "P",
        genero: "feminino",
        cor: "rosa",
        estoque: 10
    },
    {
        imagem: "img/camisa-longa.jpeg",
        alt: "Camisa de Manga Longa",
        nome: "Camisa de Manga Longa",
        descricao: "Camisa de manga longa feita com tecido técnico de alta performance, ideal para treinos intensos e atividades ao ar livre. Possui design ajustado, respirável e com tecido que ajuda na gestão da umidade, proporcionando conforto e liberdade de movimento durante o exercício.",
        preco: "R$ 86,90",
        parcelamento: "2x de R$ 43,45",
        tamanho: "",
        genero: "masculino",
        cor: "",
        estoque: 0
    },
    {
        imagem: "img/alta-performance.jpeg",
        alt: "Camiseta masculina de alta performance",
        nome: "Camiseta masculina de alta performance",
        descricao: "Camiseta masculina de alta performance, feita com tecido respirável, leve e elasticidade que acompanha seus movimentos durante os treinos. Design slim fit, ideal para quem busca conforto e estilo na academia ou na rotina esportiva. Detalhes modernos com acabamento de alta qualidade, perfeita para quem leva a sério sua performance.",
        preco: "R$ 98,90",
        parcelamento: "2x de R$ 49,45",
        tamanho: "",
        genero: "masculino",
        cor: "",
        estoque: 0
    },
    {
        imagem: "img/camisa-preta2.jpg",
        alt: "Camisa Preta Justa",
        nome: "Camisa Preta Justa",
        descricao: "Camisa de compressão masculina de alta performance, confeccionada com tecido técnico de excelência que garante máxima respirabilidade, excelente elasticidade e suporte firme. Ideal para treinos intensos, corridas ou atividades que exigem rendimento máximo, proporcionando conforto e estabilidade durante toda a performance.",
        preco: "R$ 94,90",
        parcelamento: "2x de R$ 47,45",
        tamanho: "",
        genero: "masculino",
        cor: "",
        estoque: 0
    },
    {
        imagem: "img/casal-conjunto.jpeg",
        alt: "Conjunto Casual para Casal",
        nome: "Conjunto Casual para Casal",
        descricao: "Conjunto de roupas fitness para casal, combina estilo e conforto. Tecido respirável, ótimo para treinos na academia ou ao ar livre. Disponível em várias cores e tamanhos.",
        preco: "R$ 199,90",
        parcelamento: "4x de R$ 49,98",
        tamanho: "",
        genero: "",
        cor: "",
        estoque: 0
    },
    {
        imagem: "img/elastico.jpeg",
        alt: "Elástico de Resistência para Exercícios",
        nome: "Elástico de Resistência para Exercícios",
        descricao: "Elástico de resistência de alta qualidade, ideal para treinos de força, alongamento e reabilitação. Confeito em material durável e flexível, disponível em diferentes níveis de intensidade para incrementar suas sessões de treino. Compacto e fácil de transportar, perfeito para usar em casa, no parque ou na academia.",
        preco: "R$ 49,90",
        parcelamento: "2x de R$ 24,95",
        tamanho: "",
        genero: "",
        cor: "",
        estoque: 0
    },
    {
        imagem: "img/fem5.png",
        alt: "Macacão Street Moxie",
        nome: "Macacão Fit Street Moxie",
        descricao: "Macacão feminino da linha Street Moxie, com design slim e acabamento em tecido stretch de alta resistência. Perfeito para um visual urbano, confortável e moderno, ideal para o dia a dia, treinos ou looks casuais. Cor preta, estilosa e versátil para quem busca praticidade com atitude.",
        preco: "R$ 179,90",
        parcelamento: "3x de R$ 59,97",
        tamanho: "P",
        genero: "feminino",
        cor: "preto",
        estoque: 10
    },
    {
        imagem: "img/fem2.png",
        alt: "Conjunto Fitness Feminino",
        nome: "Conjunto Fitness Feminino",
        descricao: "Conjunto de top e legging fitness feitos em tecido de alta performance, com acabamento confortável e resistente. O top oferece suporte perfeito para treinos de alta intensidade, enquanto a legging garante liberdade de movimento e ajuste perfeito ao corpo. Ideal para atividades na academia, yoga ou corrida, proporcionando estilo e conforto.",
        preco: "R$ 149,99",
        parcelamento: "3x de R$ 50,00",
        tamanho: "",
        genero: "feminino",
        cor: "",
        estoque: 0
    },
    {
        imagem: "img/fem3.png",
        alt: "Polo Sport Moxie Elegance",
        nome: "Polo Sport Moxie Elegance",
        descricao: "A Polo Sport Moxie Elegance combina sofisticação e funcionalidade para quem busca estilo dentro e fora dos treinos. Com design moderno e acabamento impecável, esta polo sem mangas proporciona conforto e respirabilidade, ideal para atividades ao ar livre como golfe, caminhada ou treinos leves. Seu tecido premium oferece um toque suave e ajuste perfeito, garantindo liberdade de movimento e máxima performance. Disponível na cor branca, com detalhes sutis que exaltam a essência esportiva e elegante da Moxie.",
        preco: "R$ 129,50",
        parcelamento: "2x de R$ 64,75",
        tamanho: "",
        genero: "feminino",
        cor: "branco",
        estoque: 0
    },
    {
        imagem: "img/fem4.png",
        alt: "Conjunto Moxie Green Flow",
        nome: "Conjunto Moxie Green Flow",
        descricao: "O Conjunto Moxie Green Flow foi pensado para quem busca conforto e estilo nos treinos. Composto por um top cropped de alças largas e leggings de cintura alta, esse conjunto traz um design sofisticado e moderno na cor verde-claro. Seu tecido canelado oferece ajuste perfeito ao corpo, proporcionando suporte e flexibilidade para exercícios como ioga, pilates e musculação. Além disso, sua alta respirabilidade mantém você sempre fresca, permitindo máximo desempenho sem perder o estilo.",
        preco: "R$ 179,90",
        parcelamento: "3x de R$ 59,97",
        tamanho: "",
        genero: "feminino",
        cor: "verde-claro",
        estoque: 0
    },
    {
        imagem: "img/fem6.png",
        alt: "Conjunto Fitness Moxie Pink Power",
        nome: "Conjunto Fitness Moxie Pink Power",
        descricao: "O Conjunto Fitness Moxie Pink Power é a combinação perfeita de estilo e desempenho. Composto por um top de alças largas e um short de cintura alta, ambos em preto com detalhes em rosa vibrante, este conjunto garante suporte, conforto e modelagem impecável. Seus recortes estratégicos proporcionam liberdade de movimento, tornando-o ideal para treinos de musculação, corrida e yoga. Feito com tecido de alta tecnologia, oferece respirabilidade e elasticidade para que você treine com máxima confiança e energia.",
        preco: "R$ 145,99",
        parcelamento: "3x de R$ 48,66",
        tamanho: "",
        genero: "feminino",
        cor: "preto/rosa",
        estoque: 0
    },
    {
        imagem: "img/verde-jade.jpeg",
        alt: "Conjunto Fitness Verde Jade",
        nome: "Conjunto Fitness Verde Jade",
        descricao: "Conjunto de roupa fitness composto por top e legging na cor verde jade vibrante. Feito com tecido de alta compressão, que oferece conforto, suporte e liberdade de movimento durante os exercícios. Design moderno e ajustado ao corpo, ideal para treinos na academia, corrida ou yoga. Perfeito para quem busca estilo e funcionalidade na hora de se exercitar.",
        preco: "R$ 40,41",
        parcelamento: "2x de R$ 20,21",
        tamanho: "",
        genero: "feminino",
        cor: "verde jade",
        estoque: 0
    },
    {
        imagem: "img/fem8.png",
        alt: "Strap Moxie Grip",
        nome: "Strap Moxie Grip",
        descricao: "O Strap Moxie Grip é o acessório essencial para quem quer elevar seus treinos de força ao próximo nível. Com design anatômico e textura premium, ele proporciona maior aderência e segurança em exercícios como levantamento de peso, barra fixa e remada. Ajustável e confortável, seu material resistente oferece suporte aos punhos e reduz o impacto, garantindo mais estabilidade e potência nos seus movimentos. Seu detalhe em rosa vibrante adiciona um toque de estilo à sua rotina fitness.",
        preco: "R$ 69,90",
        parcelamento: "2x de R$ 34,95",
        tamanho: "",
        genero: "feminino",
        cor: "rosa",
        estoque: 0
    },
    {
        imagem: "img/masc-casual1.jpeg",
        alt: "Conjunto Esportivo Casual",
        nome: "Conjunto Esportivo Casual",
        descricao: "Conjunto de camiseta e shorts super finos + camisa moletom ideal para treinos e atividades físicas. O tecido leve e respirável proporciona conforto e liberdade de movimento. Design moderno e estiloso, perfeito para quem busca praticidade e conforto no dia a dia. Disponível em várias cores.",
        preco: "R$ 144,90",
        parcelamento: "3x de R$ 48,30",
        tamanho: "",
        genero: "masculino",
        cor: "",
        estoque: 0
    },
    {
        imagem: "img/shorts.jpeg",
        alt: "Shorts Moxie TitanGrip",
        nome: "Shorts Moxie TitanGrip",
        descricao: "O Shorts Moxie TitanGrip foi criado para quem busca máxima performance e conforto nos treinos intensos. Com design robusto e ajuste perfeito, ele combina estilo e funcionalidade para suportar qualquer desafio. Seu tecido resistente e elástico garante liberdade de movimento e suporte ideal, enquanto os detalhes em costura reforçada oferecem maior durabilidade. Ideal para treinos de musculação, funcional e resistência, ele proporciona aderência e segurança nos exercícios.",
        preco: "R$ 98,99",
        parcelamento: "2x de R$ 49,50",
        tamanho: "",
        genero: "masculino",
        cor: "",
        estoque: 0
    },
    {
        imagem: "img/camisa-cinza.jpeg",
        alt: "Camiseta Moxie UrbanFlex",
        nome: "Camiseta Moxie UrbanFlex",
        descricao: "A Camiseta Moxie UrbanFlex é perfeita para treinos e momentos de lazer, combinando estilo e funcionalidade. Com tecido respirável e tecnologia de secagem rápida, proporciona conforto máximo mesmo durante os exercícios mais intensos. Seu design urbano e moderno, aliado à modelagem ajustada, garante liberdade de movimento sem comprometer a estética. Seja para treinar ou para um look casual esportivo, a UrbanFlex é a escolha ideal para quem busca performance e estilo.",
        preco: "R$ 79,99",
        parcelamento: "2x de R$ 40,00",
        tamanho: "",
        genero: "masculino",
        cor: "",
        estoque: 0
    },
    {
        imagem: "img/masc-moxie.jpeg",
        alt: "Regata Moxie Pursuit",
        nome: "Regata Moxie Pursuit",
        descricao: "A Regata Moxie Pursuit é a escolha ideal para quem busca conforto e estilo nos treinos de alta intensidade. Com tecido leve e respirável, ela garante máxima ventilação e secagem rápida, mantendo você focado no seu desempenho. Seu design moderno e estampado com a frase \"Relentless Pursuit\" transmite determinação e atitude, inspirando você a ir sempre além. Perfeita para musculação, corrida e treinos funcionais, essa regata se ajusta ao corpo sem comprometer a mobilidade.",
        preco: "R$ 89,90",
        parcelamento: "2x de R$ 44,95",
        tamanho: "",
        genero: "masculino",
        cor: "",
        estoque: 0
    },
    {
        imagem: "img/masc-moxie2.jpeg",
        alt: "Conjunto Esportivo Fit Moxie",
        nome: "Conjunto Esportivo Fit Moxie",
        descricao: "O conjunto Fit Moxie é a combinação perfeita entre conforto e estilo para quem busca um visual esportivo e moderno. A camisa oversized proporciona leveza e liberdade de movimento, enquanto o shorts de alta performance oferece ajuste confortável e flexibilidade para qualquer atividade. Feito com tecido respirável e tecnologia de secagem rápida, esse conjunto azul claro é ideal para treinos ou um look casual cheio de atitude.",
        preco: "R$ 139,90",
        parcelamento: "3x de R$ 46,63",
        tamanho: "",
        genero: "masculino",
        cor: "azul claro",
        estoque: 0
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

// Função para redirecionar para a página do produto
function redirecionarParaProduto(index) {
    const produto = produtos[index];
    const queryString = `?imagem=${encodeURIComponent(produto.imagem)}&alt=${encodeURIComponent(produto.alt)}&nome=${encodeURIComponent(produto.nome)}&descricao=${encodeURIComponent(produto.descricao)}&preco=${encodeURIComponent(produto.preco)}&parcelamento=${encodeURIComponent(produto.parcelamento || '')}&tamanho=${encodeURIComponent(produto.tamanho || '')}&cor=${encodeURIComponent(produto.cor || '')}&genero=${encodeURIComponent(produto.genero || '')}`; // Adiciona os parâmetros da URL
    window.location.href = `produto.html${queryString}`;
}

// Adicionar evento aos botões "Comprar" add-to-cart <button class="add-to-cart" data-id="${index}">Comprar</button>
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart')) {
        const produtoId = event.target.getAttribute('data-id');
        const produtoSelecionado = produtos[produtoId];

        // Verifica se o produto já está no carrinho
        const itemExistente = carrinho.find(item => item.nome === produtoSelecionado.nome);
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