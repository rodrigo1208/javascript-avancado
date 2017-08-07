class ListaNegociacoes {

    constructor() {
        this._negociacoes = [];
    }

    adiciona(negociacao) {
        this._negociacoes.push(negociacao);
    }

    get negociacoes() {
        return [].concat(this._negociacoes); 
    }

    esvazia() {
        this._negociacoes = [];
    }

    ordena(contexto) {
        this._negociacoes.sort(contexto);
    }

    inverteOrdem(){
        this._negociacoes.reverse();
    }

}