
var listaPessoas = [];

function salvar(){
    var pessoa = {};

    pessoa.nome = 
            document.getElementById("nome").value;
    pessoa.idade = 
            document.getElementById("idade").value;
    pessoa.telefone = 
            document.getElementById("telefone").value;

    listaPessoas.push(pessoa);

    renderiza();
    zerarInputs();
}

function renderiza(){
    // busco o tbody com o id
    const tbody = document.getElementById("corpo-tabela");

    // zerando o conteúdo da tabela
    tbody.innerHTML = '';

    for(let i=0; i<listaPessoas.length; i++){
        // Busco a pessoa da lista
        const pessoa = listaPessoas[i];

        // cria um elemento html do tipo tr
        // table row - linha da tabela
        let tr = document.createElement('tr');

        // cria um elemento html do tipo td
        // table data - dado da tabela
        let tdNome = document.createElement('td');
        let tdIdade = document.createElement('td');
        let tdTelefone = document.createElement('td');
        let tdOpcoes = document.createElement('td');

        let btnEditar = document.createElement('button');
        btnEditar.innerHTML = 'Editar';
        btnEditar.onclick = function(){
            editar(i);
        }
        
        // popular os td com o valor a ser mostrado
        tdNome.innerHTML = pessoa.nome;
        tdIdade.innerHTML = pessoa.idade;
        tdTelefone.innerHTML = pessoa.telefone;
        tdOpcoes.appendChild(btnEditar); 

        // adiciono os td dentro do tr
        // na order a ser exibida
        tr.appendChild(tdNome);
        tr.appendChild(tdIdade);
        tr.appendChild(tdTelefone);
        tr.appendChild(tdOpcoes);

        // adiciona o tr no tbody
        tbody.appendChild(tr);
    }
}

function zerarInputs(){
    document.getElementById("nome").value = '';
    document.getElementById("idade").value = '';
    document.getElementById("telefone").value = '';
}

function editar(index){
    const pessoa = listaPessoas[index];

    document.getElementById("nome").value = pessoa.nome;
    document.getElementById("idade").value = pessoa.idade;
    document.getElementById("telefone").value = pessoa.telefone;

}