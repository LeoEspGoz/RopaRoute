const inputBusqueda = document.getElementById('busqueda');
const listaOpciones = document.getElementById('listaOpciones');
const btnBuscar = document.getElementById('btnBuscar');

// Función para actualizar la lista de opciones
function actualizarListaOpciones(textoBusqueda) {
  // Limpiar la lista de opciones
  listaOpciones.innerHTML = '';

  // Obtener las opciones
  const opciones = ['Pantalones', 'Camisas formales', 'Tacos', 'Moroleón'];

  // Filtrar las opciones que coincidan con el texto de búsqueda
  const opcionesFiltradas = opciones.filter(opcion => opcion.toLowerCase().includes(textoBusqueda.toLowerCase()));

  // Agregar las opciones a la lista
  opcionesFiltradas.forEach(opcion => {
    const elementoLista = document.createElement('li');
    elementoLista.classList.add('list-group-item');
    elementoLista.innerText = opcion;
    listaOpciones.appendChild(elementoLista);
  });
}

inputBusqueda.addEventListener('input', () => {
  const textoBusqueda = inputBusqueda.value;
  actualizarListaOpciones(textoBusqueda);
});

btnBuscar.addEventListener('click', () => {
  const opcionSeleccionada = listaOpciones.querySelector('.active');
  if (opcionSeleccionada) {
   
    const textoOpcionSeleccionada = opcionSeleccionada.innerText;

   
    console.log(`Realizar búsqueda con el texto: ${textoOpcionSeleccionada}`);
  }
});

listaOpciones.firstElementChild.classList.add('active');

actualizarListaOpciones('');
