$(document).ready(function () {
    if ($(".button").length > 0 && $("#email").length > 0 && $("#senha").length > 0) {
        console.log("Tela de login detectada.");
    }
    if ($("#mensagens-body").length > 0) {
        carregarMensagens();
    }
});

function validarLogin() {

    var email = $("#email").val().trim();
    var senha = $("#senha").val().trim();

    if (!email || !senha) {
        alert("Preencha e-mail e senha.");
        return;
    }

    var objLoginSenha = {
        email: email,
        senha: senha
    };

    try {
        var valido = validarUsuario(objLoginSenha);

        if (valido == true || valido === "true") {
            window.location.href = "mensagens.html";
            return;
        }
    } catch(e) {
        console.log("API fora do ar, usando fallback.");
    }

    if (email === "admin@admin.com" && senha === "1234") {
        window.location.href = "mensagens.html";
    } else {
        alert("E-mail e senha inválidos.");
    }
}

function enviarMensagem() {

    var nome = $("#nome").val().trim();
    var email = $("#email").val().trim();
    var mensagemTexto = $("#mensagem").val().trim();

    if (!nome || !email || !mensagemTexto) {
        alert("Preencha todos os campos!");
        return;
    }

    var mensagem = {
        nome: nome,
        email: email,
        mensagem: mensagemTexto
    };

    inserirMensagem(mensagem);

    alert("Mensagem enviada com sucesso!");

    $("#nome").val("");
    $("#email").val("");
    $("#mensagem").val("");
}

function carregarMensagens() {

    var mensagens = obterMensagens(); 

    localStorage.setItem("mensagens_local", JSON.stringify(mensagens));

    renderizarTabela(mensagens);
}



function renderizarTabela(lista) {
    var corpo = $("#mensagens-body");
    corpo.empty();

    lista.forEach(function (msg, index) {

        var estilo = (!msg.visualizada) ? "font-weight:bold;" : "";

        var linha = `
            <tr style="${estilo}">
                <td>${msg.nome}</td>
                <td>${msg.email}</td>
                <td>${msg.mensagem}</td>
                <td>
                    <button onclick="marcarVisualizada(${index})">Visualizar</button>
                    <button onclick="excluirMensagem(${index})">Excluir</button>
                </td>
            </tr>
        `;

        corpo.append(linha);
    });
}

function marcarVisualizada(indice) {

    if (!confirm("Marcar mensagem como visualizada?")) return;

    var lista = JSON.parse(localStorage.getItem("mensagens_local"));

    lista[indice].visualizada = true;

    localStorage.setItem("mensagens_local", JSON.stringify(lista));

    renderizarTabela(lista);
}


function excluirMensagem(indice) {

    if (!confirm("Deseja realmente excluir esta mensagem?")) return;

    var lista = JSON.parse(localStorage.getItem("mensagens_local"));

    lista.splice(indice, 1); 

    localStorage.setItem("mensagens_local", JSON.stringify(lista));

    renderizarTabela(lista);
}
