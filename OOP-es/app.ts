class Veicolo {
    Marca: string
    Modello: string
    velocitàMassima: number
    readonly targa: string
    constructor(marca: string, modello: string, velocitàMassima: number, targa: string) {
        this.Marca = marca
        this.Modello = modello
        this.velocitàMassima = velocitàMassima
        this.targa = targa
    }
    
    descrizione(this: Veicolo): void {
        console.log(`Questo veicolo appartiene alla marca ${this.Marca}, modello ${this.Modello}, ha una velocità massima di ${this.velocitàMassima} km/h.`)
    } 
}

class Auto extends Veicolo {
    numeroPorte: number

    constructor(marca: string, modello: string, velocitàMassima: number, targa: string, numeroPorte: number) {
        super(marca, modello, velocitàMassima, targa)
        this.numeroPorte = numeroPorte
    }

    descriviAuto(this: Auto): void {
        super.descrizione()
        console.log(`Ha ${this.numeroPorte} porte e la sua targa è ${this.targa}.`)
    }
}

class Moto extends Veicolo {
    tipoManubrio: string

    constructor(marca: string, modello: string, velocitàMassima: number, targa: string, tipoManubrio: string) {
        super(marca, modello, velocitàMassima, targa)
        this.tipoManubrio = tipoManubrio
    }

    descriviMoto(this: Moto): void {
        super.descrizione()
        console.log(`Ha un manubrio ${this.tipoManubrio}.`)
    }
}

const auto = new Auto('Hyundai', 'Kona', 200, 'ABCD123', 5)
auto.descriviAuto()

const moto = new Moto('Honda', 'Civic', 180, 'XYZ123', 'moto')
moto.descriviMoto()
