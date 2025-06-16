document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formFuncionario');
    const mensagemSucesso = document.getElementById('mensagem-sucesso');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Limpeza (em produção, aqui você pode validar também)
        form.reset();
        mensagemSucesso.style.display = 'block';

        setTimeout(() => {
            mensagemSucesso.style.display = 'none';
        }, 2400);
    });

    // Máscara simples para CPF
    form.cpf.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g,'');
        if (value.length > 11) value = value.slice(0,11);
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        e.target.value = value;
    });

    // Máscara simples para telefone
    form.telefone.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g,'');
        if (value.length > 11) value = value.slice(0,11);
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
        e.target.value = value;
    });

    const btnLogout = document.querySelector('.logout-btn');
    btnLogout.addEventListener('click', () => {
        window.location.href = 'login.html';
    });
});