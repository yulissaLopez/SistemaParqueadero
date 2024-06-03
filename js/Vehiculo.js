//clase para crear vehiculos

class Vehiculo{
    constructor(tipo, placa, marca, modelo, estado = true ){
        this.tipo = tipo;
        this.placa = placa;
        this.marca = marca;
        this.modelo = modelo;
        this.estado = estado;
    }
}

export{ Vehiculo }