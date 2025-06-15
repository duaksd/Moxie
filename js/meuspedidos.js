document.addEventListener('DOMContentLoaded', async () => {
  const API_URL = 'http://localhost:4000';
  const token = localStorage.getItem('token');
  const tbody = document.getElementById('pedidos-lista');

  if (!token) {
    window.location.href = '/login.html?redirect=meuspedidos.html';
    return;
  }

  // Busca o usuário autenticado
  let usuario;
  try {
    const resp = await fetch(`${API_URL}/usuarios/protegida`, {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    usuario = await resp.json();
    if (!usuario.id) throw new Error();
  } catch {
    tbody.innerHTML = `<tr><td colspan="6">Não foi possível carregar seus pedidos. Faça login novamente.</td></tr>`;
    return;
  }

  // Busca os pedidos do usuário
  try {
    const resp = await fetch(`${API_URL}/pedidos/usuario/${usuario.id}`, {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    const pedidos = await resp.json();

    if (!Array.isArray(pedidos) || pedidos.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6">Você ainda não fez nenhum pedido.</td></tr>`;
      return;
    }

    tbody.innerHTML = '';
    pedidos.forEach(pedido => {
      const data = new Date(pedido.createdAt);
      const dataFormatada = data.toLocaleDateString('pt-BR') + ' ' + data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const status = pedido.status === 'pendente' ? 'Aguardando pagamento' : (pedido.status === 'enviado' ? 'Pedido enviado' : pedido.status);

      tbody.innerHTML += `
        <tr>
          <td>
            <a href="#" class="pedido-link">Moxie-${pedido.id.toString().padStart(8, '0')}</a>
            <time datetime="${pedido.createdAt}" class="pedido-date">${dataFormatada}</time>
          </td>
          <td class="valor">R$ ${Number(pedido.total).toFixed(2)}</td>
          <td>
            <div class="status" aria-label="${status}">
              <span class="material-icons" aria-hidden="true" title="${status}">local_shipping</span>
              ${status}
            </div>
          </td>
          <td class="mensagem">${pedido.status === 'enviado' ? 'Seu pedido foi enviado! Obrigada pela confiança.' : 'Seu pedido está em processamento.'}</td>
          <td>
            <button class="btn-detalhes" aria-label="Ver detalhes do pedido Moxie-${pedido.id.toString().padStart(8, '0')}">Ver endereço</button>
          </td>
          <td>
            <button class="btn-detalhes" aria-label="Código de Rastreio do pedido Moxie-${pedido.id.toString().padStart(8, '0')}">Código de Rastreio</button>
          </td>
        </tr>
      `;
    });
  } catch (error) {
    tbody.innerHTML = `<tr><td colspan="6">Erro ao carregar pedidos.</td></tr>`;
  }
});