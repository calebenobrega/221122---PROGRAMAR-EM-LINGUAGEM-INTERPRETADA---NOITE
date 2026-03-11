// Estado principal da aplicacao
let frutas = [];
let proximoId = 1;
let usuarioLogado = false;

// Login fixo definido no codigo
const USUARIO_SISTEMA = {
    nome: 'calebe',
    senha: 'senha'
};

// Carrega frutas salvas e recalcula o proximo ID
function carregarDados() {
    const dados = localStorage.getItem('frutas');
    if (!dados) return;

    frutas = JSON.parse(dados);
    if (frutas.length > 0) {
        proximoId = Math.max(...frutas.map((fruta) => fruta.id)) + 1;
    }
}

// Salva o array no navegador
function salvarDados() {
    localStorage.setItem('frutas', JSON.stringify(frutas));
}

// Mostra texto na caixa de resultado da tela
function mostrarResultado(mensagem) {
    document.getElementById('resultado-display').textContent = mensagem;
}

// Pede nome e senha ate autenticar
function login() {
    while (!usuarioLogado) {
        const nome = prompt('Login\nDigite seu nome:');
        if (nome === null) {
            alert('Voce precisa fazer login para entrar.');
            continue;
        }

        const senha = prompt('Digite sua senha:');
        if (senha === null) {
            alert('Voce precisa fazer login para entrar.');
            continue;
        }

        const nomeCorreto = nome.trim().toLowerCase() === USUARIO_SISTEMA.nome;
        const senhaCorreta = senha === USUARIO_SISTEMA.senha;

        if (nomeCorreto && senhaCorreta) {
            usuarioLogado = true;
            alert('Bem-vindo, ' + USUARIO_SISTEMA.nome + '!');
            mostrarResultado('Login realizado com sucesso!\n\nUsuario: ' + USUARIO_SISTEMA.nome);
            return;
        }

        alert('Nome ou senha invalidos. Tente novamente.');
    }
}

// Garante que nenhuma acao rode sem login
function verificarLogin() {
    if (usuarioLogado) return true;
    alert('Faca login para continuar.');
    login();
    return usuarioLogado;
}

// Coleta e valida valor numerico com prompt
function pedirNumero(mensagem, usarFloat = false) {
    const entrada = prompt(mensagem);
    if (entrada === null) return null;

    const numero = usarFloat ? parseFloat(entrada) : parseInt(entrada, 10);
    if (Number.isNaN(numero) || numero < 0) {
        alert('Valor invalido!');
        return undefined;
    }

    return numero;
}

// Cria uma fruta nova
function adicionarFruta() {
    if (!verificarLogin()) return;

    const nome = prompt('Digite o nome da fruta:');
    if (nome === null) return;
    if (nome.trim() === '') {
        alert('Nome nao pode estar vazio!');
        return;
    }

    const valor = pedirNumero('Digite o valor unitario:', true);
    if (valor === null || valor === undefined) return;

    const quantidade = pedirNumero('Digite a quantidade em estoque:');
    if (quantidade === null || quantidade === undefined) return;

    const novaFruta = {
        id: proximoId++,
        nome: nome.trim(),
        valor,
        quantidade
    };

    frutas.push(novaFruta);
    salvarDados();

    mostrarResultado(
        `Fruta adicionada com sucesso!\n\nID: ${novaFruta.id}\nNome: ${novaFruta.nome}\nValor: R$ ${novaFruta.valor.toFixed(2)}\nQuantidade: ${novaFruta.quantidade}`
    );
}

// Lista todas as frutas cadastradas
function listarTudo() {
    if (!verificarLogin()) return;

    if (frutas.length === 0) {
        mostrarResultado('Nenhuma fruta cadastrada.');
        return;
    }

    let texto = 'FRUTAS CADASTRADAS:\n\n';
    frutas.forEach((fruta) => {
        texto += `ID: ${fruta.id}\nNome: ${fruta.nome}\nValor: R$ ${fruta.valor.toFixed(2)}\nQuantidade: ${fruta.quantidade}\n\n`;
    });

    mostrarResultado(texto);
}

// Busca uma fruta pelo ID
function listarPorId() {
    if (!verificarLogin()) return;

    const id = pedirNumero('Digite o ID da fruta:');
    if (id === null || id === undefined) return;

    const fruta = frutas.find((item) => item.id === id);
    if (!fruta) {
        mostrarResultado(`Fruta com ID ${id} nao encontrada.`);
        return;
    }

    mostrarResultado(
        `FRUTA ENCONTRADA:\n\nID: ${fruta.id}\nNome: ${fruta.nome}\nValor: R$ ${fruta.valor.toFixed(2)}\nQuantidade: ${fruta.quantidade}`
    );
}

// Edita campos de uma fruta existente
function editarFruta() {
    if (!verificarLogin()) return;

    const id = pedirNumero('Digite o ID da fruta a editar:');
    if (id === null || id === undefined) return;

    const fruta = frutas.find((item) => item.id === id);
    if (!fruta) {
        mostrarResultado(`Fruta com ID ${id} nao encontrada.`);
        return;
    }

    const novoNome = prompt('Novo nome (deixe vazio para manter):', fruta.nome);
    if (novoNome === null) return;
    if (novoNome.trim() !== '') fruta.nome = novoNome.trim();

    const novoValorTexto = prompt('Novo valor (deixe vazio para manter):', fruta.valor);
    if (novoValorTexto === null) return;
    if (novoValorTexto.trim() !== '') {
        const novoValor = parseFloat(novoValorTexto);
        if (Number.isNaN(novoValor) || novoValor < 0) {
            alert('Valor invalido!');
            return;
        }
        fruta.valor = novoValor;
    }

    const novaQuantidadeTexto = prompt('Nova quantidade (deixe vazio para manter):', fruta.quantidade);
    if (novaQuantidadeTexto === null) return;
    if (novaQuantidadeTexto.trim() !== '') {
        const novaQuantidade = parseInt(novaQuantidadeTexto, 10);
        if (Number.isNaN(novaQuantidade) || novaQuantidade < 0) {
            alert('Quantidade invalida!');
            return;
        }
        fruta.quantidade = novaQuantidade;
    }

    salvarDados();
    mostrarResultado(
        `Fruta atualizada!\n\nID: ${fruta.id}\nNome: ${fruta.nome}\nValor: R$ ${fruta.valor.toFixed(2)}\nQuantidade: ${fruta.quantidade}`
    );
}

// Remove fruta por ID
function deletarFruta() {
    if (!verificarLogin()) return;

    const id = pedirNumero('Digite o ID da fruta a deletar:');
    if (id === null || id === undefined) return;

    const index = frutas.findIndex((item) => item.id === id);
    if (index === -1) {
        mostrarResultado(`Fruta com ID ${id} nao encontrada.`);
        return;
    }

    const fruta = frutas[index];
    const confirmar = confirm(`Deseja deletar a fruta "${fruta.nome}"?`);
    if (!confirmar) {
        mostrarResultado('Operacao cancelada.');
        return;
    }

    frutas.splice(index, 1);
    salvarDados();
    mostrarResultado(`Fruta com ID ${fruta.id} deletada com sucesso!`);
}

// Faz logout e pede login novamente
function sair() {
    const confirmar = confirm('Deseja sair da aplicacao?\nOs dados serao mantidos no localStorage.');
    if (!confirmar) return;

    usuarioLogado = false;
    mostrarResultado('Voce saiu da aplicacao.');
    alert('Logout realizado.');
    login();
}

// Inicializacao da pagina
window.addEventListener('DOMContentLoaded', () => {
    carregarDados();
    login();
    mostrarResultado('Bem-vindo ao CRUD Hortifruti!\n\nUse os botoes acima para gerenciar o estoque.\nOs dados sao salvos no localStorage.');
});
