
// executa assim que a página terminar de carregar
(function () {

    var listaPessoas = [];

    function salvar() {
        var pessoa = {};

        pessoa.nome = $("#nome").val();
        pessoa.idade = $("#idade").val();
        pessoa.telefone = $("#telefone").val();

        let id = $("#id").val();

        // não tenho código = criar novo
        if (id == undefined || id == '') {
            pessoa.id = new Date().getTime();
            listaPessoas.push(pessoa);
        } else { // se tenho id, estou editando
            let idNumber = parseInt(id);
            let pessoaExistente = findPessoaById(idNumber);

            if (pessoaExistente) {
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

    function renderiza() {
        // busco o tbody com o id
        const tbody = $("#corpo-tabela");

        // zerando o conteúdo da tabela
        tbody.html('');


        for (let i = 0; i < listaPessoas.length; i++) {
            // Busco a pessoa da lista
            const pessoa = listaPessoas[i];

            // cria um elemento html do tipo tr
            // table row - linha da tabela
            let tr = $('<tr>');

            // cria um elemento html do tipo td
            // table data - dado da tabela
            // popular os td com o valor a ser mostrado
            let tdNome = $('<td>').text(pessoa.nome);
            let tdIdade = $('<td>').text(pessoa.idade);
            let tdTelefone = $('<td>').text(pessoa.telefone);
            let tdOpcoes = $('<td>');

            let btnEditar = $('<button>').text('Editar');
            let btnExcluir = $('<button>').text('Excluir');

            // associa o click a uma function
            btnEditar.click(function () {
                editar(pessoa.id);
            });

            // associa o click a uma function
            const fn_exc = function () {
                excluir(pessoa.id);
            };
            btnExcluir.click(fn_exc);

            tdOpcoes.append(btnEditar).append(btnExcluir);

            // adiciono os td dentro do tr
            // na order a ser exibida
            tr.append(tdNome)
                .append(tdIdade)
                .append(tdTelefone)
                .append(tdOpcoes);

            // adiciona o tr no tbody
            tbody.append(tr);
        }
    }

    function editar(id) {
        let pessoa = findPessoaById(id);

        if (pessoa) {
            $("#nome").val(pessoa.nome);
            $("#idade").val(pessoa.idade);
            $("#telefone").val(pessoa.telefone);
            $("#id").val(pessoa.id);
        } else {
            alert('Não foi possível encontrar a pessoa');
        }
    }


    function excluir(id) {
        listaPessoas = listaPessoas
            .filter(function (value) {
                return value.id != id;
            });

        gravaNoLocalStorage();
        renderiza();
    }

    function findPessoaById(id) {
        let pessoas = listaPessoas
            .filter(function (value) {
                return value.id == id;
            });

        if (pessoas.length == 0) {
            return undefined;
        } else {
            return pessoas[0];
        }
    }

    function zerarInputs() {
        $("#formulario input").val('');
    }

    function gravaNoLocalStorage() {
        // convertendo a lista em string no formato JSON
        const listaEmJSON = JSON.stringify(listaPessoas);

        // gravando no localStorage
        localStorage.setItem("lista", listaEmJSON);
    }

    function buscaDoLocalStorage() {
        // busca do local storage
        const listaStorage = localStorage.getItem("lista");

        // converte para lista e atribui
        listaPessoas = JSON.parse(listaStorage) || [];
    }

    // o que se deseja executar
    buscaDoLocalStorage();
    renderiza();

    document.getElementById("formulario")
        .addEventListener("submit", function (evt) {
            salvar();
            // corta a linha de execucao
            evt.stopPropagation();

            // previne o comportamento padrão
            evt.preventDefault();
        });

    // busco todos os inputs
    const inputs = document.querySelectorAll('input, select');

    for (element of inputs) {
        element.oninvalid = function () {
            const msg = this.getAttribute('data-custom-message');

            if (msg) {
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
