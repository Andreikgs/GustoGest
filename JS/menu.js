const listaItens = [
  { nome: "Pizza Margherita", descricao: "Mussarela, tomate, manjericão fresco.", valor: 39.90 },
  { nome: "Risoto de Camarão", descricao: "Camarões frescos com arroz arbório e creme.", valor: 49.50 },
  { nome: "Salada Caesar", descricao: "Alface americana, frango grelhado, parmesão e molho Caesar.", valor: 29.90 },
];

function renderizarMenu() {
  const container = document.getElementById('menuList');
  container.innerHTML = '';
  listaItens.forEach(item => {
    const card = document.createElement('div');
    card.className = 'menu-card';
    card.innerHTML = `
      <h3>${item.nome}</h3>
      <p>${item.descricao || ''}</p>
      <span>R$ ${item.valor.toFixed(2)}</span>
    `;
    container.appendChild(card);
  });
}

function abrirModal() {
  document.getElementById('modalItem').classList.add('active');
  document.getElementById('formItem').reset();
}

function fecharModal() {
  document.getElementById('modalItem').classList.remove('active');
}

document.getElementById('formItem').addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = document.getElementById('nomeItem').value.trim();
  const desc = document.getElementById('descItem').value.trim();
  const valor = parseFloat(document.getElementById('valorItem').value) || 0;
  if (nome && valor > 0) {
    listaItens.push({ nome, descricao: desc, valor });
    renderizarMenu();
    fecharModal();
  }
});

window.abrirModal = abrirModal;
window.fecharModal = fecharModal;

renderizarMenu();