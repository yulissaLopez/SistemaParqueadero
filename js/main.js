//importar la funcion validar placa y el vehiculo
import { validarPlaca } from "./validarPlaca.js";
import { Vehiculo } from "./Vehiculo.js";
import { Usuario } from "./Usuario.js";
import { agregarDatosTabla } from "./agregarDatosTabla.js";


document.addEventListener("DOMContentLoaded", ()=>{
    //Traer los elementos 
    //placa del vehiculo ingresada por el usuario
    const placa = document.getElementById("placa");
    const btnEnviar = document.getElementById("btnEnviar");
    const form = document.getElementById("form_registro");
    const formUsu = document.getElementById("formUsuario");
    const btnRegUsu = document.getElementById("regUsu");
    const marcaInput = document.getElementById("marca");
    //Obtener la referencia de la tabla
    const bodyTabla = document.getElementById("bodyTablaVehiculos");
    const contenedorUsu = document.getElementById("contenedor");
    //vehiculo de prueba
    const vehiculoPrueba = new Vehiculo("carro", "YLC-998","BMW", "X");
    const motoPrueba = new Vehiculo("moto", "YLC-99D","BMW", "X");
    //listado de vehiculos (es un array de objetos Vehiculo)
    const lista_vehiculos = [vehiculoPrueba, motoPrueba];
    const lista_usuarios = [];
    const lista_marca_motos = ["BMW", "DUCATI", "YAMAHA", "HONDA", "SUZUKI", "KAWASAKI"];
    const lista_marca_carros = ["BMW", "MERCEDES BENZ", "FERRARI", "KIA", "CHEVROLET", "MAZDA", "NISSAN"];
    //console.log(lista_vehiculos)



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
                //si es de tipo moto o carro
                if(tipo === "moto"){
                    //mostrar lista de moto en el option
                    for(let i = 0; i < lista_marca_motos.length; i++){
                        const opcion = document.createElement("option");
                        opcion.textContent = lista_marca_motos[i];
                        marcaInput.appendChild(opcion);
                    }

                }else if(tipo === "carro"){
                    //mostrar lista de carro en el option
                    for(let i = 0; i < lista_marca_carros.length; i++){
                        const opcion = document.createElement("option");
                        opcion.textContent = lista_marca_carros[i];
                        marcaInput.appendChild(opcion);
                    }
                }
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

                    const opcion = document.createElement("option");
                    opcion.textContent = lista_vehiculos[indice].marca;
                    marcaInput.appendChild(opcion);
                    modeloInput.value = lista_vehiculos[indice].modelo;

                    alert("El vehiculo ya esta en el Parqueadero");
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
        const servicio = document.getElementById("servicio").value;

        //crear un nuevo vehiculo
        const vehiculo = new Vehiculo(tipo, placa, marca,modelo);

        //agregarlo al array de vehiculos
        lista_vehiculos.push(vehiculo);
        if(servicio === 'mes'){
            //mostrar el contenesor 
            contenedorUsu.style.display = "block";
        }

        //funcion que agregue a una tabla
        agregarDatosTabla(vehiculo, bodyTabla);
        //borra los campos del form
        marcaInput.innerHTML = " ";
        form.reset();
        //oculta los campos del form
        campos.style.display = "none";

    })

    btnRegUsu.addEventListener("click", ()=>{
        //llamar los campos 
        const idUsu = document.getElementById("idUsu").value;
        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;

        //se crea un nuevo usuario
        //se le asignan los valores de usuario a los atributos del nuevo usuario
        const usuario = new Usuario(idUsu, nombre, email);
        
        //se agrega a la lista de usuarios
        lista_usuarios.push(usuario);
        console.log(lista_usuarios);
        //borra los campos del form
        formUsu.reset();
        //se esconde el formulario
        contenedorUsu.style.display = "none";


    })

})