function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        id: params.get('id'),
        imagem: params.get('imagem'),
        alt: params.get('alt'),
        nome: params.get('nome'),
        descricao: params.get('descricao'),
        preco: params.get('preco'),
        parcelamento: params.get('parcelamento'),
        tamanho: params.get('tamanho'),
        cor: params.get('cor'),
        genero: params.get('genero')
    };
}

// Preenche os dados do produto na página
const produto = getQueryParams();
if (produto.imagem) {
    document.getElementById('produto-imagem').src = produto.imagem;
    document.getElementById('produto-imagem').alt = produto.alt;
    document.getElementById('produto-nome').textContent = produto.nome;
    document.getElementById('produto-descricao').textContent = produto.descricao;
    document.getElementById('produto-preco').textContent = `Preço: ${produto.preco}`;
    document.getElementById('produto-parcela').textContent = produto.parcelamento
        ? `Parcelamento: ${produto.parcelamento}`
        : 'Parcelamento não disponível.';
    document.getElementById('produto-tamanho').textContent = produto.tamanho
        ? `Tamanho: ${produto.tamanho}`
        : 'Tamanho não disponível.';
    document.getElementById('produto-cor').textContent = produto.cor
        ? `Cor: ${produto.cor}`
        : 'Cor não disponível.';
} else {
    document.querySelector('.produto-detalhes').innerHTML = '<p>Produto não encontrado.</p>';
}

// Adicionar produto ao carrinho (envia para o backend)
document.getElementById('adicionar-carrinho').addEventListener('click', async () => {
    const usuarioStr = localStorage.getItem('usuario');
    let usuario_id = null;
    if (usuarioStr) {
        const usuario = JSON.parse(usuarioStr);
        usuario_id = usuario.id;
    }
    const produto_id = Number(produto.id);

    if (!usuario_id || !produto_id) {
        alert('Usuário ou produto não identificado!');
        return;
    }

    try {
        const response = await fetch('http://localhost:4000/carrinho', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                usuario_id,
                produto_id,
                quantidade: 1
            })
        });

        if (response.ok) {
            alert('Produto adicionado ao carrinho!');
        } else {
            const erro = await response.json();
            alert('Erro ao adicionar ao carrinho: ' + (erro.error || ''));
        }
    } catch (error) {
        alert('Erro de conexão com o servidor.');
    }
});

// Função para verificar se o produto já está nos favoritos
function isFavorito(produto) {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    return favoritos.some(item => item.nome === produto.nome);
}

// Atualiza o estado do checkbox de favoritos ao carregar a página
const favoriteCheckbox = document.getElementById('favorite');
favoriteCheckbox.checked = isFavorito(produto);

// Evento do botão de favoritos
favoriteCheckbox.addEventListener('change', function () {
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    if (this.checked) {
        if (!favoritos.find(item => item.nome === produto.nome)) {
            favoritos.push(produto);
            localStorage.setItem('favoritos', JSON.stringify(favoritos));
        }
    } else {
        favoritos = favoritos.filter(item => item.nome !== produto.nome);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
    }
});