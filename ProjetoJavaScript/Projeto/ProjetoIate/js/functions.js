function enviarMensagem() {
    var nome = $('#nome').val().trim();
    var email = $('#email').val().trim();
    var mensagem = $('#msg').val().trim();
    
    
    if (!nome || !email || !mensagem) {
        alert('Por favor, preencha todos os campos!');
        return;
    }
    
    var mensagemObj = {
        nome: nome,
        email: email,
        mensagem: mensagem
    };
    
    inserirMensagem(mensagemObj);
    
    
    $('#nome').val('');
    $('#email').val('');
    $('#msg').val('');
    
    alert('Mensagem enviada com sucesso!');
}

function validarLogin() {
    var login = {
        email: $('#email').val(),
        senha: $('#senha').val()
    };
    
    if (validarUsuario(login)) {
        window.location.href = 'mensagens.html';
    } else {
        alert('E-mail ou senha inválidos!');
        $('#email').val('');
        $('#senha').val('');
    }
}

function carregarMensagens() {
    var mensagens = obterMensagens();
    var tbody = $('#mensagens-body');
    tbody.empty(); 

    if (mensagens && mensagens.length > 0) {
        mensagens.forEach(function(mensagem) {
            var row = $('<tr>');
            row.append($('<td>').text(mensagem.nome));
            row.append($('<td>').text(mensagem.email));
            row.append($('<td>').addClass('message-content').text(mensagem.mensagem));
            tbody.append(row);
        });
    } else {
        var row = $('<tr>');
        row.append($('<td colspan="3">').text('Nenhuma mensagem recebida.'));
        tbody.append(row);
    }
}

$(document).ready(function() {
    if (window.location.pathname.includes('mensagens.html')) {
        carregarMensagens();
    }
});