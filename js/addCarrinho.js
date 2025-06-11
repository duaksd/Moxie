document.addEventListener('click', async (event) => {
  if (event.target.classList.contains('add-to-cart')) {
    const produtoId = event.target.getAttribute('data-id');
    // Supondo que você tem um array global "produtos"
    const produtoSelecionado = produtos[produtoId];

    // Pega o usuário logado do localStorage (ajuste conforme seu login)
    const usuarioStr = localStorage.getItem('usuario');
    if (!usuarioStr) {
      alert('Você precisa estar logado para adicionar ao carrinho.');
      return;
    }
    const usuario = JSON.parse(usuarioStr);
    const usuarioId = usuario.id;

    try {
      const response = await fetch('http://localhost:4000/carrinho', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          usuario_id: Number(usuarioId),
          produto_id: produtoSelecionado.id,
          quantidade: 1 // Sempre adiciona 1, backend deve somar se já existir
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao adicionar produto ao carrinho.');
      }

      alert(`${produtoSelecionado.nome} foi adicionado ao carrinho!`);
    } catch (erro) {
      console.error('Erro ao adicionar ao carrinho:', erro);
      alert('Erro ao adicionar o produto ao carrinho.');
    }
  }
});