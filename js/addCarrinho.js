document.addEventListener('click', async (event) => {
  if (event.target.classList.contains('add-to-cart')) {
    const produtoId = event.target.getAttribute('data-id');
    const produtoSelecionado = produtos[produtoId];

    const usuarioId = localStorage.getItem('usuarioId'); // Certifique-se de que está armazenado
    if (!usuarioId) {
      alert('Você precisa estar logado para adicionar ao carrinho.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/carrinho', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          usuario_id: Number(usuarioId),
          produto_id: produtoSelecionado.id,
          quantidade: 1
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao adicionar produto ao carrinho.');
      }

      alert(`${produtoSelecionado.nome} foi adicionado ao carrinho com sucesso!`);
    } catch (erro) {
      console.error('Erro:', erro);
      alert('Erro ao adicionar o produto ao carrinho.');
    }
  }
});
