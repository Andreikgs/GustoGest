// Simula um array de insumos para teste inicial
let estoque = [
  {nome: 'Farinha de Trigo', quantidade: 20, unidade: 'kg'},
  {nome: 'Leite', quantidade: 12, unidade: 'L'},
  {nome: 'Ovos', quantidade: 240, unidade: 'un'},
];

function renderEstoque() {
  const tbody = document.getElementById('stock-list');
  tbody.innerHTML = "";

  estoque.forEach((item, idx) => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${item.nome}</td>
      <td>${item.quantidade}</td>
      <td>${item.unidade}</td>
      <td>
        <div class="stock-adjust-group">
          <button class="btn adjust" onclick="ajustarQuantidade(${idx}, -1)">-</button>
          <button class="btn adjust" onclick="ajustarQuantidade(${idx}, 1)">+</button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

window.ajustarQuantidade = function(idx, delta) {
  if (estoque[idx].quantidade + delta >= 0)
    estoque[idx].quantidade += delta;
  renderEstoque();
};

// Modal lógica
const modalBg = document.getElementById('stock-modal-bg');
const openModalBtn = document.getElementById('openAddStockModal');
const saveBtn = document.getElementById('save-insumo');
const cancelBtn = document.getElementById('cancel-insumo');
const nomeInput = document.getElementById('stock-name');
const qtdInput = document.getElementById('stock-qty');
const unitInput = document.getElementById('stock-unit');

openModalBtn.onclick = () => {
  nomeInput.value = "";
  qtdInput.value = "";
  unitInput.value = "";
  modalBg.classList.add('active');
}

cancelBtn.onclick = () => {
  modalBg.classList.remove('active');
}

saveBtn.onclick = () => {
  const nome = nomeInput.value.trim();
  const quantidade = Number(qtdInput.value);
  const unidade = unitInput.value.trim();
  if (nome && quantidade >= 0 && unidade) {
    estoque.push({nome, quantidade, unidade});
    modalBg.classList.remove('active');
    renderEstoque();
  } else {
    alert('Preencha todos os campos corretamente!');
  }
}

window.onclick = function(e) {
  if (e.target === modalBg) {
    modalBg.classList.remove('active');
  }
};

const btnLogout = document.querySelector('.logout-btn');
    btnLogout.addEventListener('click', () => {
        window.location.href = 'login.html';
    });

renderEstoque();