export function agregarDatosTabla(vehiculo, tabla){

    //Crear una nueva fila
    let fila = tabla.insertRow();
    let celdaTipo = fila.insertCell(0);
    let celdaPlaca = fila.insertCell(1);
    let celdaMarca = fila.insertCell(2);
    let celdaModelo = fila.insertCell(3);
    let celdaFecha = fila.insertCell(4);
    let celdaHora = fila.insertCell(5);

    //Establecer el contenido de las celdas
    celdaTipo.textContent = vehiculo.tipo;
    celdaPlaca.textContent = vehiculo.placa;
    celdaMarca.textContent = vehiculo.marca;
    celdaModelo.textContent = vehiculo.modelo; 

    let hora = new Date().getHours();
    let minutos = new Date().getMinutes();

    celdaFecha.textContent = new Date().toDateString(); 
    celdaHora.textContent = hora + ":" + minutos;
   
    
}