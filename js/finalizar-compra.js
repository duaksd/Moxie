document.addEventListener('DOMContentLoaded', async () => {
  // Configurações
  const API_URL = 'http://localhost:4000';
  const token = localStorage.getItem('token');
  const mensagemResultado = document.getElementById('mensagem-resultado');
  
  // Verificar autenticação
  if (!token) {
    window.location.href = '/login.html?redirect=finalizar-compra.html';
    return;
  }

  // Estado da aplicação
  let usuario = null;
  let enderecosUsuario = [];
  let enderecoSelecionado = null;
  let carrinhoItens = [];
  let cupomAplicado = null;
  let freteCalculado = 0;

  // Elementos do DOM
  const elementos = {
    enderecoEntrega: document.getElementById('endereco-entrega'),
    btnAlterarEndereco: document.getElementById('btn-alterar-endereco'),
    formEndereco: document.getElementById('form-endereco'),
    inputCupom: document.getElementById('input-cupom'),
    btnAplicarCupom: document.getElementById('aplicar-cupom'),
    mensagemCupom: document.getElementById('mensagem-cupom'),
    produtosLista: document.getElementById('produtos-lista'),
    subtotalProdutos: document.getElementById('subtotal-produtos'),
    freteValor: document.getElementById('frete-valor'),
    descontoValor: document.getElementById('desconto-valor'),
    totalPagar: document.getElementById('total-pagar'),
    formPagamento: document.getElementById('form-pagamento')
  };

  // Inicialização
  try {
    await carregarUsuario();
    await carregarEnderecos();
    await carregarCarrinho();
    calcularTotais();
  } catch (error) {
    console.error('Erro na inicialização:', error);
    mostrarMensagem('Erro ao carregar dados da página', 'erro');
  }

  // Event Listeners
  elementos.btnAlterarEndereco.addEventListener('click', toggleFormEndereco);
  elementos.formEndereco.addEventListener('submit', salvarEndereco);
  elementos.btnAplicarCupom.addEventListener('click', aplicarCupom);
  elementos.formPagamento.addEventListener('submit', finalizarPedido);

  // Funções principais

  async function carregarUsuario() {
    try {
      const response = await fetch(`${API_URL}/usuarios/protegida`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) {
        throw new Error('Falha na autenticação');
      }
      
      usuario = await response.json();
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
      mostrarMensagem('Sessão expirada. Faça login novamente.', 'erro');
      setTimeout(() => window.location.href = '/login.html', 2000);
      throw error;
    }
  }

  async function carregarEnderecos() {
    try {
      const response = await fetch(`${API_URL}/enderecos/usuario/${usuario.id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) {
        throw new Error('Erro ao carregar endereços');
      }
      
      enderecosUsuario = await response.json();
      
      if (enderecosUsuario.length > 0) {
        enderecoSelecionado = enderecosUsuario[0];
        renderizarEndereco();
      } else {
        elementos.enderecoEntrega.innerHTML = '<p>Nenhum endereço cadastrado. Por favor, adicione um.</p>';
        toggleFormEndereco(true);
      }
    } catch (error) {
      console.error('Erro ao carregar endereços:', error);
      elementos.enderecoEntrega.innerHTML = '<p>Erro ao carregar endereços</p>';
      throw error;
    }
  }

  async function carregarCarrinho() {
    try {
      const response = await fetch(`${API_URL}/carrinho/usuario/${usuario.id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) {
        throw new Error('Erro ao carregar carrinho');
      }
      
      carrinhoItens = await response.json();
      
      if (carrinhoItens.length === 0) {
        mostrarMensagem('Seu carrinho está vazio', 'aviso');
        setTimeout(() => window.location.href = '/carrinho.html', 2000);
        return;
      }
      
      renderizarProdutos();
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
      mostrarMensagem('Erro ao carregar itens do carrinho', 'erro');
      throw error;
    }
  }

  function renderizarEndereco() {
    if (!enderecoSelecionado) return;
    
    let html = `
      <p><strong>${enderecoSelecionado.tipo || 'Endereço'}:</strong> ${enderecoSelecionado.logradouro}, ${enderecoSelecionado.numero}</p>
      ${enderecoSelecionado.complemento ? `<p>Complemento: ${enderecoSelecionado.complemento}</p>` : ''}
      <p>${enderecoSelecionado.bairro}, ${enderecoSelecionado.cidade} - ${enderecoSelecionado.estado}</p>
      <p>CEP: ${formatarCEP(enderecoSelecionado.cep)}</p>
    `;
    
    if (enderecosUsuario.length > 1) {
      html += `
        <div class="seletor-endereco">
          <label for="select-endereco">Escolher outro endereço:</label>
          <select id="select-endereco">
            ${enderecosUsuario.map((endereco, index) => `
              <option value="${index}" ${enderecoSelecionado.id === endereco.id ? 'selected' : ''}>
                ${endereco.logradouro}, ${endereco.numero} - ${endereco.bairro}
              </option>
            `).join('')}
          </select>
        </div>
      `;
    }
    
    elementos.enderecoEntrega.innerHTML = html;
    
    if (enderecosUsuario.length > 1) {
      document.getElementById('select-endereco').addEventListener('change', (e) => {
        enderecoSelecionado = enderecosUsuario[e.target.value];
        renderizarEndereco();
        calcularFrete();
        calcularTotais();
      });
    }
  }

  function renderizarProdutos() {
    elementos.produtosLista.innerHTML = '';
    
    if (carrinhoItens.length === 0) {
      elementos.produtosLista.innerHTML = '<tr><td colspan="4">Seu carrinho está vazio</td></tr>';
      return;
    }
    
    carrinhoItens.forEach(item => {
      const produto = item.produto || item;
      const precoUnitario = parseFloat(produto.preco) || 0;
      const totalItem = precoUnitario * item.quantidade;
      
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          <img src="${produto.imagem_url || 'img/sem-imagem.jpg'}" alt="${produto.nome}" width="50">
          ${produto.nome}
        </td>
        <td>R$ ${precoUnitario.toFixed(2)}</td>
        <td>${item.quantidade}</td>
        <td>R$ ${totalItem.toFixed(2)}</td>
      `;
      elementos.produtosLista.appendChild(tr);
    });
  }

  function toggleFormEndereco(mostrar = null) {
    const deveMostrar = mostrar !== null ? mostrar : elementos.formEndereco.style.display !== 'block';
    elementos.formEndereco.style.display = deveMostrar ? 'block' : 'none';
    elementos.btnAlterarEndereco.setAttribute('aria-expanded', deveMostrar.toString());
    elementos.formEndereco.setAttribute('aria-hidden', (!deveMostrar).toString());
    
    if (deveMostrar && enderecoSelecionado) {
      // Preencher formulário com dados existentes
      document.getElementById('cep').value = enderecoSelecionado.cep || '';
      document.getElementById('endereco').value = enderecoSelecionado.logradouro || '';
      document.getElementById('numero').value = enderecoSelecionado.numero || '';
      document.getElementById('complemento').value = enderecoSelecionado.complemento || '';
      document.getElementById('bairro').value = enderecoSelecionado.bairro || '';
      document.getElementById('cidade').value = enderecoSelecionado.cidade || '';
      document.getElementById('estado').value = enderecoSelecionado.estado || '';
    }
  }

  async function salvarEndereco(e) {
    e.preventDefault();
    
    const formData = {
      usuario_id: usuario.id,
      tipo: 'residencial',
      cep: document.getElementById('cep').value.replace(/\D/g, ''),
      logradouro: document.getElementById('endereco').value.trim(),
      numero: document.getElementById('numero').value.trim(),
      complemento: document.getElementById('complemento').value.trim(),
      bairro: document.getElementById('bairro').value.trim(),
      cidade: document.getElementById('cidade').value.trim(),
      estado: document.getElementById('estado').value
    };
    
    // Validação simples
    if (!formData.cep || formData.cep.length !== 8) {
      mostrarMensagem('CEP inválido', 'erro');
      return;
    }
    
    if (!formData.logradouro || !formData.numero || !formData.bairro || !formData.cidade || !formData.estado) {
      mostrarMensagem('Preencha todos os campos obrigatórios', 'erro');
      return;
    }
    
    try {
      const response = await fetch(`${API_URL}/enderecos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Erro ao salvar endereço');
      }
      
      const novoEndereco = await response.json();
      enderecosUsuario.push(novoEndereco);
      enderecoSelecionado = novoEndereco;
      
      renderizarEndereco();
      toggleFormEndereco(false);
      calcularFrete();
      calcularTotais();
      
      mostrarMensagem('Endereço salvo com sucesso', 'sucesso');
    } catch (error) {
      console.error('Erro ao salvar endereço:', error);
      mostrarMensagem('Erro ao salvar endereço', 'erro');
    }
  }

  async function aplicarCupom() {
    const codigoCupom = elementos.inputCupom.value.trim();
    
    if (!codigoCupom) {
      mostrarMensagem('Digite um código de cupom', 'aviso', elementos.mensagemCupom);
      return;
    }
    
    try {
      const response = await fetch(`${API_URL}/cupons/codigo/${codigoCupom}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) {
        throw new Error('Cupom inválido ou expirado');
      }
      
      cupomAplicado = await response.json();
      
      // Verificar validade
      const hoje = new Date();
      const validade = new Date(cupomAplicado.validade);
      
      if (validade < hoje) {
        throw new Error('Cupom expirado');
      }
      
      if (!cupomAplicado.ativo) {
        throw new Error('Cupom inativo');
      }
      
      mostrarMensagem('Cupom aplicado com sucesso!', 'sucesso', elementos.mensagemCupom);
      calcularTotais();
    } catch (error) {
      console.error('Erro ao aplicar cupom:', error);
      cupomAplicado = null;
      mostrarMensagem(error.message || 'Erro ao aplicar cupom', 'erro', elementos.mensagemCupom);
      calcularTotais();
    }
  }

  function calcularFrete() {
    if (!enderecoSelecionado || !enderecoSelecionado.cep) {
      freteCalculado = 0;
      return;
    }
    
    const primeiraLetraCEP = enderecoSelecionado.cep.charAt(0);
    
    if (['8', '9'].includes(primeiraLetraCEP)) {
      freteCalculado = 25.00;
    } else if (['6', '7'].includes(primeiraLetraCEP)) {
      freteCalculado = 20.00;
    } else {
      freteCalculado = 15.00;
    }
    
    // Se tem cupom de frete grátis
    if (cupomAplicado && cupomAplicado.codigo.toLowerCase().includes('frete')) {
      freteCalculado = 0;
    }
  }

  function calcularTotais() {
    calcularFrete();
    
    const subtotal = carrinhoItens.reduce((total, item) => {
      const produto = item.produto || item;
      const preco = parseFloat(produto.preco) || 0;
      return total + (preco * item.quantidade);
    }, 0);
    
    let desconto = 0;
    if (cupomAplicado) {
      if (cupomAplicado.desconto_percentual) {
        desconto = subtotal * (cupomAplicado.desconto_percentual / 100);
      }
    }
    
    const total = subtotal + freteCalculado - desconto;
    
    // Atualizar UI
    elementos.subtotalProdutos.textContent = `R$ ${subtotal.toFixed(2)}`;
    elementos.freteValor.textContent = `R$ ${freteCalculado.toFixed(2)}`;
    elementos.descontoValor.textContent = `- R$ ${desconto.toFixed(2)}`;
    elementos.totalPagar.textContent = `R$ ${total.toFixed(2)}`;
  }

  async function finalizarPedido(e) {
    e.preventDefault();
    
    // Validações
    if (carrinhoItens.length === 0) {
      mostrarMensagem('Seu carrinho está vazio', 'erro');
      return;
    }
    
    if (!enderecoSelecionado) {
      mostrarMensagem('Selecione ou cadastre um endereço de entrega', 'erro');
      return;
    }
    
    const formaPagamento = document.querySelector('input[name="pagamento"]:checked')?.value;
    if (!formaPagamento) {
      mostrarMensagem('Selecione uma forma de pagamento', 'erro');
      return;
    }
    
    // Dados do pedido
    const pedidoData = {
      forma_pagamento: formaPagamento,
      endereco_id: enderecoSelecionado.id
    };
    
    if (cupomAplicado) {
      pedidoData.cupom = cupomAplicado.codigo;
    }
    
    try {
      mostrarMensagem('Processando seu pedido...', 'info');
      
      const response = await fetch(`${API_URL}/pedidos/finalizar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(pedidoData)
      });
      
      if (!response.ok) {
        const erro = await response.json();
        throw new Error(erro.mensagem || 'Erro ao finalizar pedido');
      }
      
      const resultado = await response.json();
      
      mostrarMensagem('Pedido finalizado com sucesso! Redirecionando...', 'sucesso');
      
      // Limpar carrinho
      await fetch(`${API_URL}/carrinho/usuario/${usuario.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      // Redirecionar para página de pedido
      setTimeout(() => {
        window.location.href = `/meuspedidos.html?id=${resultado.pedidoId}`;
      }, 2000);
      
    } catch (error) {
      console.error('Erro ao finalizar pedido:', error);
      mostrarMensagem(error.message || 'Erro ao finalizar pedido', 'erro');
    }
  }

  // Funções auxiliares

  function mostrarMensagem(texto, tipo = 'info', elemento = mensagemResultado) {
    elemento.textContent = texto;
    elemento.className = `mensagem-${tipo}`;
    elemento.style.display = 'block';
    
    if (tipo !== 'info') {
      setTimeout(() => {
        elemento.style.display = 'none';
      }, 5000);
    }
  }

  function formatarCEP(cep) {
    if (!cep) return '';
    cep = cep.toString().replace(/\D/g, '');
    return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
  }
});