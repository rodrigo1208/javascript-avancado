class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        let self = this;

        this._inputData = $('#data'); 
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._ordemAtual = '';
        
        this._listaNegociacoes = new Bind(new ListaNegociacoes(), 
                                          new NegociacoesView($('#negociacoesView')), 
                                          'adiciona', 'esvazia', 'ordena', 'inverteOrdem');
 
        this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');

        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .then(negociacoes => negociacoes.forEach(n => this._listaNegociacoes.adiciona(n)))
            .catch(erro => this._mensagem.texto = erro);

    }
    
    adiciona(event) {
        event.preventDefault();

        Promise.resolve(this._criaNegociacao())
            .then(negociacao => {
                ConnectionFactory
                    .getConnection()
                    .then(connection => new NegociacaoDao(connection))
                    .then(dao => dao.adiciona(negociacao))
                    .then(() => {
                        this._listaNegociacoes.adiciona(negociacao);
                        this._mensagem.texto = "Movimentação inserida";
                        this._limpaFormulario();
                    })
                    .catch(erro => this._mensagem.texto = erro);
            });  
    }

    importaNegociacoes() {
        new NegociacaoService()
            .obterNegociacoes()
            .then(negociacoes => {
                negociacoes.forEach(n => this._listaNegociacoes.adiciona(n));
                this._mensagem.texto = "Negociações importadas com sucesso!";
            }).catch(erro => this._mensagem.texto = erro);
    }

    apaga() {
        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(res => {
                this._listaNegociacoes.esvazia();
                this._mensagem.texto = res;
            })
            .catch(erro => this._mensagem.texto = erro);
    }

    ordena(coluna) {
        if(coluna == this._ordemAtual) {
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;
    }

    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value), 
            parseInt(this._inputQuantidade.value), 
            parseFloat(this._inputValor.value)
        );
    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }

}