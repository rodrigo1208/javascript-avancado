class NegociacaoService {

    constructor() {
        this._http = new HttpService();
    }
    
    obterNegociacoes() {
        return Promise.all([
            this.obterNegociacoesSemana(),
            this.obterNegociacoesSemanaAnterior(),
            this.obterNegociacoesSemanaRetrasada()
        ])
        .then(periodos => {
            return periodos
                .reduce((flat, array) => flat.concat(array), [])
                .map(dado => new Negociacao(dado.data, dado.quantidade, dado.valor));
        })
        .catch(erro => console.log(erro));
    }

    obterNegociacoesSemana() {
        return new Promise((resolve, reject) => {
            this._http
                .get('negociacoes/semana')
                .then(negociacoes => {
                    resolve(negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject("Não foi possivel importar as negociações da semana");
                });
        });
    }

    obterNegociacoesSemanaAnterior() {
        return new Promise((resolve, reject) => {
            this._http
                .get('negociacoes/anterior')
                .then(negociacoes => {
                    resolve(negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject("Não foi possivel importar as negociações da semana anterior");
                });
        });
    }

    obterNegociacoesSemanaRetrasada() {
        return new Promise((resolve, reject) => {
            this._http
                .get('negociacoes/retrasada')
                .then(negociacoes => {
                    resolve(negociacoes.map(obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject("Não foi possivel importar as negociações da semana retrasada");
                });
        });
    }
}