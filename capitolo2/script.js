class Persona{
    constructor(nome, cognome, eta){
        this.nome = nome;
        this.cognome = cognome;
        this.eta = eta;
    }
    //è un metodo perciò non si scrive function
    saluta(){
        console.log("mi chiamo " + this.nome);
    }
}

    class Lavoratore extends Persona{
        constructor(nome, cognome, eta, professione){
            this.nome = nome;
            this.cognome = cognome;
            this.eta = eta;
            this.lavoro = this.lavoro;
        }
    }
