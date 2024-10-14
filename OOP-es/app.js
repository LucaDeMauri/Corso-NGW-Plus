var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Veicolo = /** @class */ (function () {
    function Veicolo(marca, modello, velocitàMassima, targa) {
        this.Marca = marca;
        this.Modello = modello;
        this.velocitàMassima = velocitàMassima;
        this.targa = targa;
    }
    Veicolo.prototype.descrizione = function () {
        console.log("Questo veicolo appartiene alla marca ".concat(this.Marca, ", modello ").concat(this.Modello, ", ha una velocit\u00E0 massima di ").concat(this.velocitàMassima, " km/h."));
    };
    return Veicolo;
}());
var Auto = /** @class */ (function (_super) {
    __extends(Auto, _super);
    function Auto(marca, modello, velocitàMassima, targa, numeroPorte) {
        var _this = _super.call(this, marca, modello, velocitàMassima, targa) || this;
        _this.numeroPorte = numeroPorte;
        return _this;
    }
    Auto.prototype.descriviAuto = function () {
        _super.prototype.descrizione.call(this);
        console.log("Ha ".concat(this.numeroPorte, " porte e la sua targa \u00E8 ").concat(this.targa, "."));
    };
    return Auto;
}(Veicolo));
var Moto = /** @class */ (function (_super) {
    __extends(Moto, _super);
    function Moto(marca, modello, velocitàMassima, targa, tipoManubrio) {
        var _this = _super.call(this, marca, modello, velocitàMassima, targa) || this;
        _this.tipoManubrio = tipoManubrio;
        return _this;
    }
    Moto.prototype.descriviMoto = function () {
        _super.prototype.descrizione.call(this);
        console.log("Ha un manubrio ".concat(this.tipoManubrio, "."));
    };
    return Moto;
}(Veicolo));
var auto = new Auto('Hyundai', 'Kona', 200, 'ABCD123', 5);
auto.descriviAuto();
var moto = new Moto('Honda', 'Civic', 180, 'XYZ123', 'moto');
moto.descriviMoto();
