class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        let self = this;

        this._inputData = $('#data'); 
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        
        this._listaNegociacoes = ProxyFactory.create(
                                    new ListaNegociacoes(), 
                                    ['adiciona', 'esvazia'],
                                    (model) => this._negociacoesView.update(model));



        this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        this._negociacoesView.update(this._listaNegociacoes);
 
        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagemView.update(this._mensagem);
    }
    
    adiciona(event) {
        event.preventDefault();

        this._listaNegociacoes.adiciona(this._criaNegociacao());
        this._limpaFormulario();

        this._mensagem.texto = "Movimentação inserida";
        this._mensagemView.update(this._mensagem);
    }

    apaga() {
        this._listaNegociacoes.esvazia();

        this._mensagem.texto = "Lista de negociações apagadas com sucesso";
        this._mensagemView.update(this._mensagem);
    }

    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value), 
            this._inputQuantidade.value, 
            this._inputValor.value
        );
    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
        this._inputData.focus();
    }

}