document.addEventListener('DOMContentLoaded', function () {
    const formAluno = document.getElementById('formAluno');
    const tabelaAlunos = document.querySelector('#tabelaAlunos tbody');

   
    function adicionarNaTabela(aluno, index) {
        const tr = document.createElement('tr');
        tr.dataset.index = index; 
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

   
    function salvarAluno(aluno) {
        let alunos = JSON.parse(localStorage.getItem('alunos')) || [];
        alunos.push(aluno);
        localStorage.setItem('alunos', JSON.stringify(alunos));
    }

    function atualizarAlunos(alunos) {
        localStorage.setItem('alunos', JSON.stringify(alunos));
    }


    function carregarAlunos() {
        const alunos = JSON.parse(localStorage.getItem('alunos')) || [];
        alunos.forEach((aluno, index) => adicionarNaTabela(aluno, index));
    }

    
    function registrarSaida(index) {
        const alunos = JSON.parse(localStorage.getItem('alunos')) || [];
        alunos[index].horaSaida = new Date().toLocaleString(); 

      
        atualizarAlunos(alunos);
        recarregarTabela();
    }

    function removerAluno(index) {
        let alunos = JSON.parse(localStorage.getItem('alunos')) || [];
        alunos.splice(index, 1); 

        
        atualizarAlunos(alunos);
        recarregarTabela();
    }

   
    function recarregarTabela() {
        tabelaAlunos.innerHTML = ''; 
        carregarAlunos(); 
    }

    formAluno.addEventListener('submit', function (e) {
        e.preventDefault();

        const aluno = {
            nome: document.getElementById('nome').value,
            telefone: document.getElementById('telefone').value,
            email: document.getElementById('email').value,
            matricula: document.getElementById('matricula').value,
            horaEntrada: new Date().toLocaleString(), 
            horaSaida: null 
        };

        
        adicionarNaTabela(aluno);
        salvarAluno(aluno);

       
        formAluno.reset();
    });

    
    tabelaAlunos.addEventListener('click', function (e) {
        if (e.target.classList.contains('saida-btn')) {
            const index = e.target.dataset.index; 
            registrarSaida(index);
        }

        if (e.target.classList.contains('remover-btn')) {
            const index = e.target.dataset.index;
            removerAluno(index);
        }
    });

    
    carregarAlunos();
});
