let divVer=document.getElementById("containerVer");
let divAdd=document.getElementById("containerAdd");
let navLogout=document.getElementById("navLogout");

navLogout.addEventListener("click",(e)=>{
    e.preventDefault();
    localStorage.setItem('user',-1);
    localStorage.setItem('rol','?');
    window.location.href="index.html";
});

document.addEventListener("DOMContentLoaded", function(e) {
    let rol=localStorage.getItem("rol");
    if(rol=="Comprador"){
        divVer.style.display="none";
        divAdd.style.display="none";

    }else if(rol=="?"){
        window.location.href = "./login.html";
    }
    cargarTiendas();
});

function generarTienda({ idTienda, nombre, ubicacion, telefono, descripcion }) {
    let rol = localStorage.getItem("rol");
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
    img.src = "shopping-store.png";
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
    paragraph2.textContent = telefono;
  
    // Creación del enlace de editar
    const editLink = document.createElement("a");
    editLink.href = "#";
    editLink.classList.add("btn", "btn-light");
    //editLink.setAttribute("data-bs-toggle", "modal");
    //editLink.setAttribute("data-bs-target", "#exampleModal");
    //editLink.setAttribute("data-bs-whatever", "@mdo");
    editLink.textContent = "Eliminar de Favoritos";
    editLink.value = "ok";
    editLink.addEventListener("click", (e) => {
      e.preventDefault();
      axios
      .post("http://localhost:3000/elimFavorito", {
        idTienda:idTienda,
        idUser:localStorage.getItem("user"),
      })
      .then(function (response) {
        // console.log(response.data);
        window.location.reload();
      })
      .catch(function (error) {
        console.error("Ocurrió un error al realizar la solicitud POST:", error);
      });
    });
  
    // Creación del enlace de eliminar
    /* const deleteLink = document.createElement("a");
    deleteLink.addEventListener("click", (e) => {
      e.preventDefault();
      eliminar(idTienda);
      alert("Tienda eliminada correctamente");
    });
    deleteLink.href = "#";
    deleteLink.classList.add("btn", "btn-light");
    deleteLink.textContent = "Eliminar"; */
  
    // Agregar el título, los párrafos y los enlaces al cuerpo de la tarjeta
    cardBody.appendChild(title);
    cardBody.appendChild(paragraph1);
    cardBody.appendChild(paragraph2);
    if (rol != "?") {
      cardBody.appendChild(editLink);
    }
  
    //cardBody.appendChild(deleteLink);
  
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

  function cargarTiendas() {
    axios
      .post("http://localhost:3000/getFavorito", {
        idUser:localStorage.getItem("user")
      })
      .then(function (response) {
        // console.log(response.data);
        localStorage.setItem("data", JSON.stringify(response.data));
        datos = JSON.parse(localStorage.getItem("data"));
        response.data.forEach((element) => {
          generarTienda(element);
        });
      })
      .catch(function (error) {
        console.error("Ocurrió un error al realizar la solicitud POST:", error);
      });
  }
  