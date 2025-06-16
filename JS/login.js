document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('form-login');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const usuario = document.getElementById('login').value.trim();
        const senha = document.getElementById('senha').value.trim();
        if (!usuario || !senha) {
            alert("Preencha usuário e senha!");
            return;
        }
        window.location.href = 'dashboard.html';
    });
});