document.getElementById("telefone").addEventListener("input", function (e) {
    let valor = e.target.value.replace(/\D/g, "");
    if (e.inputType === "deleteContentBackward") {
      e.target.value = valor;
      return;
    }
    if (valor.length > 11) valor = valor.slice(0, 11);
    if (valor.length <= 10) {
      valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
    } else {
      valor = valor.replace(/^(\d{2})(\d{5})(\d{0,4})$/, "($1) $2-$3");
    }
    e.target.value = valor;
  });
  
  // Carregar dados do usuário
  async function carregarPerfil() {
    const usuarioStr = localStorage.getItem('usuario');
    const token = localStorage.getItem('token');
    if (!usuarioStr || !token) return;
    const usuario = JSON.parse(usuarioStr);
  
    try {
      const response = await fetch(`http://localhost:4000/usuarios/${usuario.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Erro ao buscar perfil');
      const dados = await response.json();
  
      // Coluna visualização
      document.getElementById('info-nome').textContent = dados.nome || '';
      document.getElementById('info-email').textContent = dados.email || '';
      document.getElementById('info-telefone').textContent = dados.telefone || '';
  
      // Coluna edição
      document.getElementById('nome').value = dados.nome || '';
      document.getElementById('email').value = dados.email || '';
      document.getElementById('telefone').value = dados.telefone || '';
    } catch (error) {
      alert('Erro ao carregar perfil!');
    }
  }
  
  // Carregar endereços do usuário como cards
  let cardAdicaoAberto = false;

  async function carregarEnderecos() {
    const usuarioStr = localStorage.getItem('usuario');
    const token = localStorage.getItem('token');
    if (!usuarioStr || !token) return;
    const usuario = JSON.parse(usuarioStr);
  
    try {
      const response = await fetch(`http://localhost:4000/enderecos/usuario/${usuario.id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Erro ao buscar endereços');
      const enderecos = await response.json();
  
      const lista = document.getElementById('enderecos-lista');
      lista.innerHTML = '';
  
      // Se o card de adição estiver aberto, mostra ele no topo
      if (cardAdicaoAberto) {
        const novoCard = document.createElement('div');
        novoCard.className = 'endereco-card';
        novoCard.innerHTML = `
        <strong>Novo Endereço</strong>
        <select id="novo-tipo" required>
          <option value="">Selecione o tipo</option>
          <option value="residencial">Residencial</option>
          <option value="comercial">Comercial</option>
          <option value="outro">Outro</option>
        </select>
        <input type="text" placeholder="CEP" id="novo-cep">
        <input type="text" placeholder="Logradouro" id="novo-logradouro">
        <input type="text" placeholder="Número" id="novo-numero">
        <input type="text" placeholder="Complemento" id="novo-complemento">
        <input type="text" placeholder="Bairro" id="novo-bairro">
        <input type="text" placeholder="Cidade" id="novo-cidade">
        <input type="text" placeholder="Estado" id="novo-estado">
        <div class="card-actions">
          <button class="salvar" id="btn-salvar-novo">Salvar</button>
          <button class="deletar" id="btn-cancelar-novo">Cancelar</button>
        </div>
      `;
        lista.appendChild(novoCard);
        document.getElementById('btn-salvar-novo').onclick = async function() {
            const usuario = JSON.parse(localStorage.getItem('usuario'));
            const token = localStorage.getItem('token');
            const dados = {
              usuario_id: usuario.id,
              tipo: document.getElementById('novo-tipo').value.trim(),
              cep: document.getElementById('novo-cep').value.trim(),
              logradouro: document.getElementById('novo-logradouro').value.trim(),
              numero: document.getElementById('novo-numero').value.trim(),
              complemento: document.getElementById('novo-complemento').value.trim(),
              bairro: document.getElementById('novo-bairro').value.trim(),
              cidade: document.getElementById('novo-cidade').value.trim(),
              estado: document.getElementById('novo-estado').value.trim()
            };
          
            // Validação simples
            if (!dados.tipo || !dados.cep || !dados.logradouro || !dados.numero || !dados.bairro || !dados.cidade || !dados.estado) {
              alert('Preencha todos os campos obrigatórios!');
              return;
            }
          
            try {
              const response = await fetch('http://localhost:4000/enderecos', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(dados)
              });
              if (!response.ok) {
                const erro = await response.json();
                alert(erro.mensagem || 'Erro ao adicionar endereço!');
                return;
              }
              cardAdicaoAberto = false;
              carregarEnderecos();
            } catch (error) {
              alert('Erro ao adicionar endereço!');
            }
          };
      }
  
      // Lista os endereços existentes
      enderecos.forEach((endereco, idx) => {
        const card = document.createElement('div');
        card.className = 'endereco-card';
        card.innerHTML = `
        <strong>Endereço ${idx + 1}</strong>
        <select id="tipo-${endereco.id}">
          <option value="residencial" ${endereco.tipo === 'residencial' ? 'selected' : ''}>Residencial</option>
          <option value="comercial" ${endereco.tipo === 'comercial' ? 'selected' : ''}>Comercial</option>
          <option value="outro" ${endereco.tipo === 'outro' ? 'selected' : ''}>Outro</option>
        </select>
        <input type="text" value="${endereco.cep}" placeholder="CEP" id="cep-${endereco.id}">
        <input type="text" value="${endereco.logradouro}" placeholder="Logradouro" id="logradouro-${endereco.id}">
        <input type="text" value="${endereco.numero}" placeholder="Número" id="numero-${endereco.id}">
        <input type="text" value="${endereco.complemento || ''}" placeholder="Complemento" id="complemento-${endereco.id}">
        <input type="text" value="${endereco.bairro}" placeholder="Bairro" id="bairro-${endereco.id}">
        <input type="text" value="${endereco.cidade}" placeholder="Cidade" id="cidade-${endereco.id}">
        <input type="text" value="${endereco.estado}" placeholder="Estado" id="estado-${endereco.id}">
        <div class="card-actions">
          <button class="salvar" onclick="salvarEndereco(${endereco.id})">Salvar</button>
          <button class="deletar" onclick="deletarEndereco(${endereco.id})">Excluir</button>
        </div>
      `;
        lista.appendChild(card);
      });
    } catch (error) {
      alert('Erro ao carregar endereços!');
    }
  }
  
  document.getElementById('btn-adicionar-endereco').addEventListener('click', function() {
    if (!cardAdicaoAberto) {
      cardAdicaoAberto = true;
      carregarEnderecos();
    }
  });
  
  // Funções de salvar e deletar continuam iguais
  window.salvarEndereco = async function(id) {
    const usuario = JSON.parse(localStorage.getItem('usuario')); // Pegue o usuário logado
    const dados = {
        usuario_id: usuario.id, // Adicione esta linha!
        tipo: document.getElementById('novo-tipo').value,
        cep: document.getElementById('novo-cep').value,
        logradouro: document.getElementById('novo-logradouro').value,
        numero: document.getElementById('novo-numero').value,
        complemento: document.getElementById('novo-complemento').value,
        bairro: document.getElementById('novo-bairro').value,
        cidade: document.getElementById('novo-cidade').value,
        estado: document.getElementById('novo-estado').value
    };
    try {
      const response = await fetch(`http://localhost:4000/enderecos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dados)
      });
      if (!response.ok) throw new Error('Erro ao salvar endereço');
      carregarEnderecos();
    } catch (error) {
      alert('Erro ao salvar endereço!');
    }
  };
  
  window.deletarEndereco = async function(id) {
    const token = localStorage.getItem('token');
    if (!confirm('Deseja realmente excluir este endereço?')) return;
    try {
      const response = await fetch(`http://localhost:4000/enderecos/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Erro ao excluir endereço');
      carregarEnderecos();
    } catch (error) {
      alert('Erro ao excluir endereço!');
    }
  };
  
  // No final do arquivo, não esqueça de chamar:
  carregarEnderecos();