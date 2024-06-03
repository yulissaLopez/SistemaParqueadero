//importar la funcion validar placa y el vehiculo
import { validarPlaca } from "./validarPlaca.js";
import { Vehiculo } from "./Vehiculo.js";


document.addEventListener("DOMContentLoaded", ()=>{
    //Traer los elementos 
    //placa del vehiculo ingresada por el usuario
    const placa = document.getElementById("placa");
    const form = document.getElementById("form_registro");
    //vehiculo de prueba
    const vehiculoPrueba = new Vehiculo("carro", "YLC-998", "X", "BMW");
    //listado de vehiculos (es un array de objetos Vehiculo)
    const lista_vehiculos = [vehiculoPrueba]
    console.log(lista_vehiculos)
    
    //evento change esta atento si el input placa cambia para ejecutar el codigo
    placa.addEventListener("change", ()=>{

        //el valor del input placa y tipo
        const placa = document.getElementById("placa").value;
        const tipo = document.getElementById("tipo").value;

        //los inputs marca, modelo, y el boton 
        const campos = document.getElementById("campos")
        const marca = document.getElementById("marca");
        const modelo = document.getElementById("modelo");
        const btnEnviar = document.getElementById("btnEnviar");

        //validar si esta bien escrita
        if(validarPlaca(placa, tipo)){
            //si esta correcta validar si existe
            //funcion que verifica que la placa sea diferente a las otras placa
            // si es true el vehiculo NO EXISTE si es false el vehiculo EXISTE
            const existe = (vehiculo) => vehiculo.placa != placa;
            console.log(lista_vehiculos.every(existe))
            if(lista_vehiculos.every(existe)){
                //habilitar el formulario
                campos.style.display = "block";
            }else{
                //si el vehiculo ya esta registrado
                //rellenar campos 
                    //buscar el indice
                // si el vehiculo NO esta en el parqueadero estado(off)
                    //boton registrar entrada
                // si el vehiculo esta en el parqueadero estado(in)
                    //Aviso de que no se puede volver a ingresar
            }
        }else{
           //si esta mal escrita pasa algo ... 
           alert("Placa INCORRECTA");
        }
    })

    //boton que registra el vehiculo
    btnEnviar.addEventListener("click", ()=>{

        const placa = document.getElementById("placa").value;
        const tipo = document.getElementById("tipo").value;
        const marca = document.getElementById("marca").value;
        const modelo = document.getElementById("modelo").value;

        //crear un nuevo vehiculo
        //const vehiculo = new Vehiculo(placa, )

        //agregarlo al array de vehiculos

        //funcion que agregue a una tabla

        //borra los campos del form
        form.reset();
        //oculta los campos del form
        campos.style.display = "none";

    })

})