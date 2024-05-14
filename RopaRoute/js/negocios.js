let btnAceptar=document.getElementById("btnAceptar");
let editNombre=document.getElementById("editNombre");
let editUbicacion=document.getElementById("editUbicacion");
let editDescrip=document.getElementById("editDescrip");
let editTelefono=document.getElementById("editTelefono");
let idTiendaActualizar=null;

let navPerfil = document.getElementById("perfil");
let navLogin = document.getElementById("login");
let navNegocios = document.getElementById("negocios");
let navLogout = document.getElementById("logout");
let idUser;
let favoritos = JSON.parse(localStorage.getItem("favoritos"));
let datos = null;


navLogout.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.setItem("user", -1);
  localStorage.setItem("rol", "?");
  window.location.href = "index.html";
});




btnAceptar.addEventListener("click", ()=>{
  //console.log(idTiendaActualizar);
  axios
  .post("http://localhost:3000/actualizarTienda", {

    idTienda: idTiendaActualizar,
    nombre:editNombre.value,
    ubicacion:editUbicacion.value,
    telefono:editTelefono.value,
    descripcion:editDescrip.value
  })
  .then(function (response) {
    console.log("Actualizacion correcta");
    window.location.reload();
  })
  .catch(function (error) {
    console.error("Ocurrió un error al realizar la solicitud POST:", error);
  });
 
  //cargarTiendas();

});


function cargarTiendas(){
  axios
  .post("http://localhost:3000/tiendas", {
    id: localStorage.getItem("user"),
  })
  .then(function (response) {
   // console.log(response.data);
    response.data.forEach((element) => {
      generarTienda(element);
    });
  })
  .catch(function (error) {
    console.error("Ocurrió un error al realizar la solicitud POST:", error);
  });
}

document.addEventListener("DOMContentLoaded", function (e) {

  
  let rol = localStorage.getItem("rol");
  if (rol == "Comprador") {
    navNegocios.style.display = "none";
  } else if (rol == "Vendedor") {
    navLogin.style.display = "none";
  } else if (rol == "?" || rol == null) {
    navNegocios.style.display = "none";
    navPerfil.style.display = "none";
    navLogout.style.display = "none";
  }
  cargarTiendas();
  
});


function generarTienda({ idTienda, nombre, ubicacion , telefono, descripcion}) {
  // Creación de la tarjeta
  const card = document.createElement("div");
  card.classList.add("card", "mt-2");
  card.style.width = "25rem";
  card.style.marginLeft = "3px";

  // Creación de la fila (row)
  const row = document.createElement("div");
  row.classList.add("row", "no-gutters");

  // Creación de la columna de la imagen
  const imgColumn = document.createElement("div");
  imgColumn.classList.add("col-md-4");

  // Creación de la imagen
  const img = document.createElement("img");
  img.src =
    "shopping-store.png";
  img.classList.add("card-img");
  img.alt = "";

  // Agregar la imagen a la columna de la imagen
  imgColumn.appendChild(img);

  // Creación de la columna del cuerpo de la tarjeta
  const bodyColumn = document.createElement("div");
  bodyColumn.classList.add("col-md-8");

  // Creación del cuerpo de la tarjeta
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  // Creación del título
  const title = document.createElement("h5");
  title.classList.add("card-title");
  title.textContent = nombre;

  // Creación del primer párrafo
  const paragraph1 = document.createElement("p");
  paragraph1.classList.add("card-text");
  paragraph1.textContent = ubicacion;

  // Creación del segundo párrafo
  const paragraph2 = document.createElement("p");
  paragraph2.classList.add("card-text");
  paragraph2.textContent = "Uriangato, Guanajuato, México";

  // Creación del enlace de editar
  const editLink = document.createElement("a");
  editLink.href = "#";
  editLink.classList.add("btn", "btn-light");
  editLink.setAttribute("data-bs-toggle", "modal");
  editLink.setAttribute("data-bs-target", "#exampleModal");
  //editLink.setAttribute("data-bs-whatever", "@mdo");
  editLink.textContent = "Editar";
  editLink.addEventListener("click", (e)=>{
    e.preventDefault();
    editNombre.value=nombre;
    editUbicacion.value=ubicacion;
    editTelefono.value=telefono;
    editDescrip.value=descripcion;
    idTiendaActualizar=idTienda;
  });

  // Creación del enlace de eliminar
  const deleteLink = document.createElement("a");
  deleteLink.addEventListener("click", (e) => {
    e.preventDefault();
    eliminar(idTienda);
    alert("Tienda eliminada correctamente");
    
  });
  deleteLink.href = "#";
  deleteLink.classList.add("btn", "btn-light");
  deleteLink.textContent = "Eliminar";

  // Agregar el título, los párrafos y los enlaces al cuerpo de la tarjeta
  cardBody.appendChild(title);
  cardBody.appendChild(paragraph1);
  cardBody.appendChild(paragraph2);
  cardBody.appendChild(editLink);
  cardBody.appendChild(deleteLink);

  // Agregar el cuerpo de la tarjeta a la columna del cuerpo de la tarjeta
  bodyColumn.appendChild(cardBody);

  // Agregar la columna de la imagen y la columna del cuerpo de la tarjeta a la fila
  row.appendChild(imgColumn);
  row.appendChild(bodyColumn);

  // Agregar la fila a la tarjeta
  card.appendChild(row);

  // Agregar la tarjeta al documento
  document.body.appendChild(card);
}

function eliminar(id) {
  axios
    .post("http://localhost:3000/eliminarTienda", {
      id: id
    })
    .then(function (response) {
      //console.log(response);
    })
    .catch(function (error) {
      console.error("Ocurrió un error al realizar la solicitud POST:", error);
    });
}

