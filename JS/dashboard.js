// Preencher cards com valores simulados
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("pedidos-dia").textContent = 18;
    document.getElementById("estoque").textContent = 42;
    document.getElementById("mesas").textContent = 5;
    document.getElementById("funcionarios").textContent = 12;

    // Botão de logout (apenas simulação)
    const btnLogout = document.querySelector('.logout-btn');
    btnLogout.addEventListener('click', () => {
        window.location.href = 'login.html';
    });
});