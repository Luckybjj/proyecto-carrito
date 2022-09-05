// Variables
const carrito = document.querySelector('#carrito'); //seleccion del id carrito
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); // boton de vaciar carrito.
const listaCursos = document.querySelector('#lista-cursos'); // div listado de cursos
let articulosCarrito = [];

const cargarEventListeners = () => {
    // cuando se agregue un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso)

    // Eliminar cursos del carrito
    carrito.addEventListener('click', eliminarCurso)

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener( 'click', () => {
        articulosCarrito = [];  // limpiar el arreglo
        limpiarHTML(); // elimina el html contenido en el carrito

    })
}

//Funciones
const agregarCurso = (e) => {
    // console.log('Presionando en cursos')
    e.preventDefault(); // prevenimos que al hacer click nos redirija al enlace #
    if (e.target.classList.contains('agregar-carrito')) {
        // console.log(e.target.parentElement.parentElement);
        const cursoSeleccionado = e.target.parentElement.parentElement; // devuelve el nodo padre del DOM
        leerDatosCurso(cursoSeleccionado);
    }
}

// Eliminar durso del carrito
const eliminarCurso = (e) => {
    // console.log(e.target.classList);    // target --> referencia al elemento que desencadenó el evento
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        // Eliminar articulos del carrito
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId)
        console.log(articulosCarrito);

        carritoHTML(); // volvemos a iterrar sobre el carrito y mostrar suu HTML 
        
    }
}

// Lee el contenido del HTML al que le dimos click y etrae la informacion del curso
const leerDatosCurso = (curso) => {
    // console.log(curso);

    // Objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,   // textContent --> extrae el contenido del h4
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),   // getAttibute() devuelve el valor del atributo especificado en el elemento
        cantidad: 1
    }
    // console.log(infoCurso);

    // Revisar si un elemento ya existe en el carrito.
    const existe =  articulosCarrito.some( curso => curso.id === infoCurso.id);
    // console.log(existe);
    if (existe) {
        // Actualiza la cantidad
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso    // retorna el objeto acutalizado
            } else {
                return curso;   // retona los objetos que no son duplicados.
            }
        })
        articulosCarrito = [...cursos];
    } else {
        // Agrega elementos al carrito
        articulosCarrito = [...articulosCarrito, infoCurso] // se toma una copia del carrito de compras y se agregan articulos del objeto infoCurso
        
    }

    console.log(articulosCarrito);
    carritoHTML(); // la llamamos despues de leer los datos del curso.

}

// Muestra el carrito de compras en el HTML --> función que se encarga de generar el HTML basado en  el carrito de compras.
const carritoHTML = () => {

    // Lipiar el HTML
    limpiarHTML();
    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso => {
        // console.log(curso);
        const { imagen, titulo, precio, cantidad} = curso;
        const row = document.createElement('tr')   // se creará un <tr> que es lo que se requiere dentro de un <tbody>
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
            </td>
            
        `;
        // Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);  // appendChikd() interta un nuevo nodo dentro de la estructura del DOM de un documento
    })
}

// Necesitamos limpiar previemente el HTML  
const limpiarHTML = () => {
    // Forma lenta
    // contenedorCarrito.innerHTML = '';

    // Mejor forma de limpiar HTML mas rápida.
    // mientras contenedorCarrito tenga al menos un elemento dentro, este código se sigue ejecutando.
    // una vez limpiado todo el HTML dentro del contenedor, ya no se ejecuta.
    while (contenedorCarrito.firstChild) {  // firstChild --> devuelve cualquier node que sea el primer hijo de este.
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
        
    }
}

cargarEventListeners();