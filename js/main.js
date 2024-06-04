//importar la funcion validar placa y el vehiculo
import { validarPlaca } from "./validarPlaca.js";
import { Vehiculo } from "./Vehiculo.js";
import { agregarDatosTabla } from "./agregarDatosTabla.js";


document.addEventListener("DOMContentLoaded", ()=>{
    //Traer los elementos 
    //placa del vehiculo ingresada por el usuario
    const placa = document.getElementById("placa");
    const btnEnviar = document.getElementById("btnEnviar");
    const form = document.getElementById("form_registro");
    //Obtener la referencia de la tabla
    const bodyTabla = document.getElementById("bodyTablaVehiculos");
    //vehiculo de prueba
    const vehiculoPrueba = new Vehiculo("carro", "YLC-998", "X", "BMW");
    const motoPrueba = new Vehiculo("moto", "YLC-99D", "X", "BMW");
    //listado de vehiculos (es un array de objetos Vehiculo)
    const lista_vehiculos = [vehiculoPrueba, motoPrueba]
    console.log(lista_vehiculos)

    //carga los datos de la lista que ya estan en la lista
    for(let i = 0; i < lista_vehiculos.length; i++){
        agregarDatosTabla(lista_vehiculos[i], bodyTabla);
    }
    
    //evento change esta atento si el input placa cambia para ejecutar el codigo
    placa.addEventListener("change", ()=>{

        //el valor del input placa y tipo
        const placa = document.getElementById("placa").value;
        const tipo = document.getElementById("tipo").value;

        //los inputs marca, modelo, y el boton 
        const campos = document.getElementById("campos");
        const marcaInput = document.getElementById("marca");
        const modeloInput = document.getElementById("modelo");
        
        //Si los campos estan activos, y se cambia la placa los vuelve a bloquear para hacer la verificacion
        if(campos.style.display === "block"){
            campos.style.display = "none";
        }

        if(btnEnviar.style.display === "none"){
            btnEnviar.style.display = "block";
            marcaInput.value = "";
            modeloInput.value = "";
        }

        //validar si esta bien escrita
        if(validarPlaca(placa, tipo)){
            //si esta correcta validar si existe
            //funcion que verifica que la placa sea diferente a las otras placa
            // si es true el vehiculo NO EXISTE si es false el vehiculo EXISTE
            const existe = (vehiculo) => vehiculo.placa != placa;
            console.log(lista_vehiculos.every(existe))
            if(lista_vehiculos.every(existe)){
                //bloquear los campos de tipo y placa
                //habilitar el formulario
                campos.style.display = "block";
            }else{
                //si el vehiculo ya esta registrado
                //rellenar campos 
                    //buscar el indice
                    const indice = lista_vehiculos.findIndex((vehiculo)=> vehiculo.placa === placa);
                    //activar los campos 
                    campos.style.display = "block";
                    //desactivar el boton
                    btnEnviar.style.display = "none";
                    //traer los datos
                    marcaInput.value = lista_vehiculos[indice].marca;
                    modeloInput.value = lista_vehiculos[indice].modelo;

                    alert("El vehiculo ya esta en el Paruqeadero");
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
        const vehiculo = new Vehiculo(tipo, placa, marca,modelo);

        //agregarlo al array de vehiculos
        lista_vehiculos.push(vehiculo);
        console.log(lista_vehiculos);

        //funcion que agregue a una tabla
        agregarDatosTabla(vehiculo, bodyTabla);
        //borra los campos del form
        form.reset();
        //oculta los campos del form
        campos.style.display = "none";

    })

})