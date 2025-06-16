// Mock dos pedidos recebidos
const pedidosMock = [
  {
    id: 1,
    mesa: 3,
    itens: ['Hambúrguer', 'Batata Frita', 'Coca-Cola'],
    hora: "13:32:10",
    timestamp: Date.now() - 2 * 60 * 1000 // Pedido feito a 2 minutos atrás
  },
  {
    id: 2,
    mesa: 7,
    itens: ['Pizza Calabresa', 'Suco de Laranja'],
    hora: "13:36:45",
    timestamp: Date.now() - 45 * 1000 // Pedido feito a 45 segundos atrás
  }
];

let temporizadores = {};

function formatarTempo(ms) {
  let totSec = Math.floor(ms / 1000);
  let min = Math.floor(totSec / 60);
  let seg = totSec % 60;
  return `${String(min).padStart(2, '0')}:${String(seg).padStart(2, '0')}`;
}

function renderizarPedidos() {
  const container = document.getElementById('lista-pedidos');
  container.innerHTML = "";

  pedidosMock.forEach(p => {
    const card = document.createElement('div');
    card.className = "pedido-card";
    card.id = `pedido-${p.id}`;

    // Informações
    const pedInfo = document.createElement('div');
    pedInfo.className = "ped-info";
    pedInfo.innerHTML = `
      <div class="ped-mesa">Mesa ${p.mesa}</div>
      <div class="ped-itens">${p.itens.map(i => `<span>🍽️ ${i}</span>`).join(' | ')}</div>
      <div class="ped-hora">Recebido às <b>${p.hora}</b></div>
      <div class="ped-temporizador" id="temporizador-${p.id}"></div>
    `;

    // Botão de pronto
    const actions = document.createElement('div');
    actions.className = "pedido-actions";
    const btnPronto = document.createElement('button');
    btnPronto.className = "btn-pronto";
    btnPronto.textContent = "Item Pronto";
    btnPronto.onclick = () => marcarPedidoPronto(p.id);

    actions.appendChild(btnPronto);

    card.appendChild(pedInfo);
    card.appendChild(actions);

    container.appendChild(card);

    // Inicializa temporizador visual
    atualizarTemporizador(p.id, p.timestamp);
    temporizadores[p.id] = setInterval(() => {
      atualizarTemporizador(p.id, p.timestamp);
    }, 1000);
  });
}

function atualizarTemporizador(id, inicioTimestamp) {
  const agora = Date.now();
  const elem = document.getElementById(`temporizador-${id}`);
  if (elem) {
    elem.textContent = "⏳ " + formatarTempo(agora - inicioTimestamp);
  }
}

function marcarPedidoPronto(id) {
  clearInterval(temporizadores[id]);
  const idx = pedidosMock.findIndex(p => p.id === id);
  if (idx !== -1) {
    pedidosMock.splice(idx, 1);
  }
  renderizarPedidos();
}

// Chamada inicial
document.addEventListener("DOMContentLoaded", renderizarPedidos);