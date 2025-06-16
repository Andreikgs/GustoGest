// Mesas e menu podem vir do backend - mock aqui
const mesas = [
  { id: 1, nome: "Mesa 1" },
  { id: 2, nome: "Mesa 2" },
  { id: 3, nome: "Mesa 3" },
  { id: 4, nome: "Mesa 4" },
  { id: 5, nome: "Mesa 5" }
];

const menuItens = [
  { id: 101, nome: "Picanha Grelhada", descricao: "Picanha suculenta com acompanhamentos", valor: 89.90 },
  { id: 102, nome: "Risoto Funghi", descricao: "Risoto cremoso com cogumelos frescos", valor: 59.00 },
  { id: 103, nome: "Hambúrguer Artesanal", descricao: "Hambúrguer de carne premium, pão brioche", valor: 42.50 },
  { id: 104, nome: "Pizza Marguerita", descricao: "Molho, queijo, tomate, manjericão fresco", valor: 54.00 },
  { id: 105, nome: "Torta de Limão", descricao: "Porção individual, massa crocante", valor: 21.00 }
];

// Renderiza as mesas como cards
function renderizarMesas() {
  const container = document.getElementById('mesas-cards');
  container.innerHTML = '';
  mesas.forEach(mesa => {
    const card = document.createElement('div');
    card.className = 'card-mesa';
    card.innerText = mesa.nome;
    card.onclick = () => selecionarMesa(mesa.id, card);
    container.appendChild(card);
  });
}

// Armazena mesa selecionada
let mesaSelecionadaId = null;

function selecionarMesa(id, cardEl) {
  mesaSelecionadaId = id;
  // Marca seleção visual
  document.querySelectorAll('.card-mesa').forEach(card => card.classList.remove('selected'));
  cardEl.classList.add('selected');
  // Mostra tela de itens
  document.getElementById('pedido-section').style.display = '';
}

// Renderiza os itens do menu para seleção múltipla
function renderizarItensMenu() {
  const container = document.getElementById('itens-menu');
  container.innerHTML = '';
  menuItens.forEach(item => {
    const row = document.createElement('div');
    row.className = 'item-menu-row';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = item.id;
    checkbox.name = 'itemMenu';

    const nome = document.createElement('span');
    nome.className = 'item-menu-nome';
    nome.innerText = item.nome;

    const desc = document.createElement('span');
    desc.className = 'item-menu-descricao';
    desc.innerText = item.descricao;

    const valor = document.createElement('span');
    valor.className = 'item-menu-valor';
    valor.innerText = `R$ ${item.valor.toFixed(2)}`;

    row.appendChild(checkbox);
    row.appendChild(nome);
    row.appendChild(desc);
    row.appendChild(valor);

    container.appendChild(row);
  });
}

// Lida com a confirmação do pedido
document.addEventListener('DOMContentLoaded', () => {
  renderizarMesas();
  renderizarItensMenu();

  document.getElementById('pedido-form').addEventListener('submit', function (e) {
    e.preventDefault();
    if (!mesaSelecionadaId) {
      alert("Por favor, selecione uma mesa.");
      return;
    }
    const itensSelecionados = Array.from(document.querySelectorAll('input[name="itemMenu"]:checked')).map(cb => Number(cb.value));
    if (itensSelecionados.length === 0) {
      alert("Selecione pelo menos um item para o pedido!");
      return;
    }
    // Simula "enviar" pedido (aqui apenas mostra, em produção envia para backend)
    const resumo = menuItens.filter(item => itensSelecionados.includes(item.id))
      .map(item => `- ${item.nome} (R$ ${item.valor.toFixed(2)})`).join('\n');
    alert(`Pedido da ${mesas.find(m => m.id === mesaSelecionadaId).nome}:\n${resumo}`);
    // Limpa seleção/após envio
    document.querySelectorAll('input[name="itemMenu"]:checked').forEach(cb => cb.checked = false);
    document.getElementById('pedido-section').style.display = 'none';
    mesaSelecionadaId = null;
    document.querySelectorAll('.card-mesa').forEach(card => card.classList.remove('selected'));
  });
});