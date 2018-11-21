
// executa assim que a página terminar de carregar
(function() {
    
var listaPessoas = [];

function salvar(){
    var pessoa = {};

    pessoa.nome = 
            document.getElementById("nome").value;
    pessoa.idade = 
            document.getElementById("idade").value;
    pessoa.telefone = 
            document.getElementById("telefone").value;

    let id = document.getElementById("id").value;

    // não tenho código = criar novo
    if(id == undefined || id == ''){
        pessoa.id = new Date().getTime();
        listaPessoas.push(pessoa);
    } else { // se tenho id, estou editando
        let idNumber = parseInt(id);
        let pessoaExistente = findPessoaById(idNumber);
        
        if(pessoaExistente){
            pessoaExistente.nome = pessoa.nome;
            pessoaExistente.idade = pessoa.idade;
            pessoaExistente.telefone = pessoa.telefone;
        }
    }

    gravaNoLocalStorage();
    renderiza();
    zerarInputs();

    return false;
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

        // popular os td com o valor a ser mostrado
        tdNome.innerHTML = pessoa.nome;
        tdIdade.innerHTML = pessoa.idade;
        tdTelefone.innerHTML = pessoa.telefone;

        let btnEditar = document.createElement('button');
        btnEditar.innerHTML = 'Editar';

        let btnExcluir = document.createElement('button');
        btnExcluir.innerHTML = 'Excluir';
        
        // associa o click a uma function
        btnEditar.onclick = function(){ 
            editar(pessoa.id); 
        }

        // associa o click a uma function
        btnExcluir.onclick = function(){ 
            excluir(pessoa.id); 
        }
        
        tdOpcoes.appendChild(btnEditar);
        tdOpcoes.appendChild(btnExcluir);

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

function editar(id){
   let pessoa = findPessoaById(id);

    if(pessoa){
        document.getElementById("nome").value = pessoa.nome;
        document.getElementById("idade").value = pessoa.idade;
        document.getElementById("telefone").value = pessoa.telefone;
        document.getElementById("id").value = pessoa.id;
    }else{
        alert('Não foi possível encontrar a pessoa');
    }
}


function excluir(id){
    listaPessoas = listaPessoas
        .filter(function(value){
            return value.id != id;
        });

    gravaNoLocalStorage();
    renderiza();
}

function findPessoaById(id){
    let pessoas = listaPessoas
        .filter(function(value){
            return value.id == id;
        });
    
    if(pessoas.length == 0){
        return undefined;
    }else{
        return pessoas[0];
    }
}

function zerarInputs(){
    document.getElementById("nome").value = '';
    document.getElementById("idade").value = '';
    document.getElementById("telefone").value = '';
    document.getElementById("id").value = '';
}

function gravaNoLocalStorage(){
    // convertendo a lista em string no formato JSON
    const listaEmJSON = JSON.stringify(listaPessoas);

    // gravando no localStorage
    localStorage.setItem("lista", listaEmJSON);
}

function buscaDoLocalStorage(){
    // busca do local storage
    const listaStorage = localStorage.getItem("lista");

    // converte para lista e atribui
    listaPessoas = JSON.parse(listaStorage) || [];
}

    // o que se deseja executar
    buscaDoLocalStorage();
    renderiza();

    document.getElementById("formulario")
        .addEventListener("submit", function(evt){
            salvar();
            // corta a linha de execucao
            evt.stopPropagation(); 

            // previne o comportamento padrão
            evt.preventDefault();
        });
    
    // busco todos os inputs
    const inputs = document.querySelectorAll('input, select');
    
    for(element of inputs){
        element.oninvalid = function(){
            const msg = this.getAttribute('data-custom-message');

            if(msg){
                // remove mensagens de erro antigas
                this.setCustomValidity("");

                // executa novamente a validação
                if (!this.validity.valid) {
                    // se inválido, coloca mensagem de erro customizada
                    this.setCustomValidity(msg);
                }
            }
        }
    }

 })();
