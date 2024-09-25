document.addEventListener('DOMContentLoaded', function () {
    const formAluno = document.getElementById('formAluno');
    const tabelaAlunos = document.querySelector('#tabelaAlunos tbody');

    // Função para adicionar aluno na tabela
    function adicionarNaTabela(aluno, index) {
        const tr = document.createElement('tr');
        tr.dataset.index = index; // Adiciona o índice como atributo da linha
        tr.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${aluno.telefone}</td>
            <td>${aluno.email}</td>
            <td>${aluno.matricula}</td>
            <td>${aluno.horaEntrada}</td>
            <td>${aluno.horaSaida || '-'}</td>
            <td>
                <button class="saida-btn" data-index="${index}">Registrar Saída</button>
                <button class="remover-btn" data-index="${index}">Remover</button>
            </td>
        `;
        tabelaAlunos.appendChild(tr);
    }

    // Função para salvar alunos no localStorage
    function salvarAluno(aluno) {
        let alunos = JSON.parse(localStorage.getItem('alunos')) || [];
        alunos.push(aluno);
        localStorage.setItem('alunos', JSON.stringify(alunos));
    }

    // Função para atualizar alunos no localStorage (usada ao registrar saída)
    function atualizarAlunos(alunos) {
        localStorage.setItem('alunos', JSON.stringify(alunos));
    }

    // Função para carregar alunos do localStorage e exibi-los na tabela
    function carregarAlunos() {
        const alunos = JSON.parse(localStorage.getItem('alunos')) || [];
        alunos.forEach((aluno, index) => adicionarNaTabela(aluno, index));
    }

    // Função para registrar a saída de um aluno
    function registrarSaida(index) {
        const alunos = JSON.parse(localStorage.getItem('alunos')) || [];
        alunos[index].horaSaida = new Date().toLocaleString(); // Atualiza a hora de saída

        // Atualizar localStorage e recarregar a tabela
        atualizarAlunos(alunos);
        recarregarTabela();
    }

    // Função para remover um aluno
    function removerAluno(index) {
        let alunos = JSON.parse(localStorage.getItem('alunos')) || [];
        alunos.splice(index, 1); // Remove o aluno pelo índice

        // Atualizar localStorage e recarregar a tabela
        atualizarAlunos(alunos);
        recarregarTabela();
    }

    // Função para recarregar a tabela após atualizações
    function recarregarTabela() {
        tabelaAlunos.innerHTML = ''; // Limpar tabela
        carregarAlunos(); // Recarregar a tabela com os dados atualizados
    }

    // Evento de envio do formulário
    formAluno.addEventListener('submit', function (e) {
        e.preventDefault(); // Evita o recarregamento da página ao submeter o formulário

        // Criar um objeto aluno com os dados do formulário
        const aluno = {
            nome: document.getElementById('nome').value,
            telefone: document.getElementById('telefone').value,
            email: document.getElementById('email').value,
            matricula: document.getElementById('matricula').value,
            horaEntrada: new Date().toLocaleString(), // Captura a hora atual como hora de entrada
            horaSaida: null // Inicialmente nulo, será atualizado ao registrar a saída
        };

        // Adicionar aluno à tabela e salvar no localStorage
        adicionarNaTabela(aluno);
        salvarAluno(aluno);

        // Limpar os campos do formulário
        formAluno.reset();
    });

    // Delegação de eventos para botões "Registrar Saída" e "Remover"
    tabelaAlunos.addEventListener('click', function (e) {
        if (e.target.classList.contains('saida-btn')) {
            const index = e.target.dataset.index; // Pega o índice do aluno
            registrarSaida(index);
        }

        if (e.target.classList.contains('remover-btn')) {
            const index = e.target.dataset.index; // Pega o índice do aluno
            removerAluno(index);
        }
    });

    // Carregar os alunos salvos no localStorage ao carregar a página
    carregarAlunos();
});
