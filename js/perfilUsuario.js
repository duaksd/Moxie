function formatarCep(cep) {
  if (!cep) return '';
  return cep.replace(/^(\d{5})(\d{3})$/, '$1-$2');
}

function formatarTelefone(telefone) {
  if (!telefone) return '';
  telefone = telefone.replace(/\D/g, '');
  if (telefone.length <= 10) {
    return telefone.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
  } else {
    return telefone.replace(/^(\d{2})(\d{5})(\d{0,4})$/, '($1) $2-$3');
  }
}

// Formatação automática do telefone no input, permitindo apagar o hífen normalmente
const telefoneInput = document.getElementById("telefone");
let ultimaTelefone = "";
telefoneInput.addEventListener("input", function (e) {
  let valor = e.target.value.replace(/\D/g, "");
  if (valor.length > 11) valor = valor.slice(0, 11);

  // Permite apagar o hífen sem pular o cursor
  if (
    e.inputType === "deleteContentBackward" &&
    ultimaTelefone.endsWith("-") &&
    !e.target.value.endsWith("-")
  ) {
    valor = valor.slice(0, -1);
  }

  const formatado = formatarTelefone(valor);
  e.target.value = formatado;
  ultimaTelefone = formatado;
});

// Preencher campos de edição com dados atuais ao carregar perfil
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
    document.getElementById('info-telefone').textContent = formatarTelefone(dados.telefone || '');

    // Coluna edição - PREENCHE os campos com os dados atuais
    document.getElementById('nome').value = dados.nome || '';
    document.getElementById('email').value = dados.email || '';
    document.getElementById('telefone').value = formatarTelefone(dados.telefone || '');
    // Não preenche senha por segurança
  } catch (error) {
    alert('Erro ao carregar perfil!');
  }
}

// Lista de estados brasileiros
const estadosOptions = `
  <option value="">Selecione o estado</option>
  <option value="AC">AC</option>
  <option value="AL">AL</option>
  <option value="AP">AP</option>
  <option value="AM">AM</option>
  <option value="BA">BA</option>
  <option value="CE">CE</option>
  <option value="DF">DF</option>
  <option value="ES">ES</option>
  <option value="GO">GO</option>
  <option value="MA">MA</option>
  <option value="MT">MT</option>
  <option value="MS">MS</option>
  <option value="MG">MG</option>
  <option value="PA">PA</option>
  <option value="PB">PB</option>
  <option value="PR">PR</option>
  <option value="PE">PE</option>
  <option value="PI">PI</option>
  <option value="RJ">RJ</option>
  <option value="RN">RN</option>
  <option value="RS">RS</option>
  <option value="RO">RO</option>
  <option value="RR">RR</option>
  <option value="SC">SC</option>
  <option value="SP">SP</option>
  <option value="SE">SE</option>
  <option value="TO">TO</option>
`;

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
        <select id="novo-estado">
          ${estadosOptions}
        </select>
        <div class="card-actions">
          <button class="salvar" id="btn-salvar-novo">Salvar</button>
          <button class="deletar" id="btn-cancelar-novo">Cancelar</button>
        </div>
      `;
      lista.appendChild(novoCard);
      document.getElementById('btn-salvar-novo').onclick = async function () {
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        const token = localStorage.getItem('token');
        const dados = {
          usuario_id: usuario.id,
          tipo: document.getElementById('novo-tipo').value.trim(),
          cep: document.getElementById('novo-cep').value.replace(/\D/g, '').trim(),
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
      document.getElementById('btn-cancelar-novo').onclick = function () {
        cardAdicaoAberto = false;
        carregarEnderecos();
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
        <input type="text" value="${formatarCep(endereco.cep)}" placeholder="CEP" id="cep-${endereco.id}">
        <input type="text" value="${endereco.logradouro}" placeholder="Logradouro" id="logradouro-${endereco.id}">
        <input type="text" value="${endereco.numero}" placeholder="Número" id="numero-${endereco.id}">
        <input type="text" value="${endereco.complemento || ''}" placeholder="Complemento" id="complemento-${endereco.id}">
        <input type="text" value="${endereco.bairro}" placeholder="Bairro" id="bairro-${endereco.id}">
        <input type="text" value="${endereco.cidade}" placeholder="Cidade" id="cidade-${endereco.id}">
        <select id="estado-${endereco.id}">
          ${estadosOptions.replace(
            `value="${endereco.estado}"`,
            `value="${endereco.estado}" selected`
          )}
        </select>
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

document.getElementById('btn-adicionar-endereco').addEventListener('click', function () {
  if (!cardAdicaoAberto) {
    cardAdicaoAberto = true;
    carregarEnderecos();
  }
});

// Intercepta o submit do formulário para chamar salvarPerfil
document.getElementById('perfil-form').addEventListener('submit', function (e) {
  e.preventDefault();
  salvarPerfil();
});

// Função para salvar perfil (edição de dados do usuário)
window.salvarPerfil = async function () {
  const usuarioStr = localStorage.getItem('usuario');
  const token = localStorage.getItem('token');
  if (!usuarioStr || !token) return;
  const usuario = JSON.parse(usuarioStr);

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  let telefoneFormatado = document.getElementById('telefone').value;
  let telefone = telefoneFormatado.replace(/\D/g, '');
  const senha = document.getElementById('senha').value;

  // Permite campo vazio OU 10/11 dígitos
  if (telefoneFormatado && telefone && !(telefone.length === 10 || telefone.length === 11)) {
    alert('Telefone deve estar no formato (12) 12345-6789 ou (12) 1234-5678');
    return;
  }

  // Não envie telefone se estiver vazio
  const dados = { nome, email };
  if (telefone) {
    dados.telefone = telefone;
  }
  if (senha && senha.length > 0) {
    dados.senha = senha;
  }

  try {
    const response = await fetch(`http://localhost:4000/usuarios/${usuario.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(dados)
    });
    if (!response.ok) {
      const erro = await response.json();
      alert(erro.mensagem || 'Erro ao salvar perfil!');
      return;
    }
    carregarPerfil();
    alert('Perfil atualizado com sucesso!');
    // Limpa o campo senha após salvar
    document.getElementById('senha').value = '';
  } catch (error) {
    alert('Erro ao salvar perfil!');
  }
};

// Funções de salvar e deletar endereços continuam iguais
window.salvarEndereco = async function (id) {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const token = localStorage.getItem('token');
  const dados = {
    usuario_id: usuario.id,
    tipo: document.getElementById(`tipo-${id}`).value,
    cep: document.getElementById(`cep-${id}`).value.replace(/\D/g, ''),
    logradouro: document.getElementById(`logradouro-${id}`).value,
    numero: document.getElementById(`numero-${id}`).value,
    complemento: document.getElementById(`complemento-${id}`).value,
    bairro: document.getElementById(`bairro-${id}`).value,
    cidade: document.getElementById(`cidade-${id}`).value,
    estado: document.getElementById(`estado-${id}`).value
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

window.deletarEndereco = async function (id) {
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

carregarEnderecos();
carregarPerfil();