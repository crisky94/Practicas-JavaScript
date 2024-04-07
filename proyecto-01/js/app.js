const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn= document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
   //Agrega un curso cuando presionas 'Agregar al carrito'
   listaCursos.addEventListener('click', agregarCurso);

   //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

   //Vacar carrito
   vaciarCarritoBtn.addEventListener('click', vaciarCarrito)
}

//Funciones
function agregarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerCurso(cursoSeleccionado);
    }
}
function vaciarCarrito() {
    articulosCarrito = []; //reseteamos el arreglo porque al presionar agregar sigen apareciendo los eliminados
    limpiarHtml();
}
//eliminar curso del carrito
function eliminarCurso(e) {
//    console.log(e.target);
     if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        //Eliminar del carrito mediante la x
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId )
        carritoHtml();//iterar sobre el carrito y mostrar su HTML
     }
}
//leer la informacion de la HTML de los cursos
function leerCurso(curso) {
   //crear un objeto con la informacion de los cursos
   const infoCurso = {
      imagen: curso.querySelector('.imagen-curso').src,
      titulo: curso.querySelector('h4').textContent,
      precio: curso.querySelector('.precio span').textContent,
      id: curso.querySelector('a').getAttribute('data-id'),
      cantidad: 1,
   }
   //Revisar si un elemento existe en el carrito
   const existe = articulosCarrito.some( curso => curso.id === infoCurso.id)
   if(existe){
    //Actualizamos la cantidad
    const cursos= articulosCarrito.map( curso => {
        if(curso.id === infoCurso.id){
            curso.cantidad++
            return curso; 
        }else {
            return curso;
        }
    })
    articulosCarrito = [...cursos]
   }else {
    //Agregamos al carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
   }
   //console.log(listaCarrito);
   carritoHtml();
}


//Muestra el carrito de compras en el HTML'
function carritoHtml() {
    //limpiar html previo
    limpiarHtml();
    //recorrer el carrito y agregar el html
    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id} = curso 
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src='${imagen}' width='100'/> 
            </td>
            <td>${titulo} </td>
            <td>${precio} </td>
            <td>${cantidad} </td>
            <td>
                <a href='#' class='borrar-curso' data-id='${id}'> X </a>
            </td>
        `;
        //Agregar el html del carrito al tbody
        contenedorCarrito.appendChild(row);
    });
}
carritoHtml();

//funcion para limpiar carrito 
function limpiarHtml() {
    //forma lenta de elimnar
   // contenedorCarrito.innerHTML = '';

   //forma rapda de eliminar
   while(contenedorCarrito.firstChild){
     contenedorCarrito.removeChild(contenedorCarrito.firstChild)
   }
}

