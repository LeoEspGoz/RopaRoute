let btnCrear=document.getElementById("btnCrear");
let txtNombre=document.getElementById("txtNombreTienda");
let txtUbicacion=document.getElementById("txtUbicacion");
let txtDescripcion=document.getElementById("txtDescripcion");
let txtTelefono=document.getElementById("txtTelefono");


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
  
  
});

btnCrear.addEventListener("click",(e)=>{
  e.preventDefault();

  
  const nombre = txtNombre.value.trim();
  const ubicacion = txtUbicacion.value.trim();
  const telefono = txtTelefono.value.trim();
  const descripcion = txtDescripcion.value.trim();

  if (nombre === '' || ubicacion === '' || telefono === '' || descripcion === '') {
      alert("Por favor, completa todos los campos.");
      return;
     }

  if (telefono.length !== 10) {
      alert("Por favor, ingresa un número de teléfono válido de 10 dígitos.");
      return; 
      }

  let id = parseInt(localStorage.getItem("user"));
  axios
  .post("http://localhost:3000/AddTienda", {
      nombre: nombre,
      ubicacion: ubicacion,
      telefono: telefono,
      descripcion: descripcion,
      idUser: id
  })
  .then(function (response) {
    console.log("Respuesta del servidor:", response.data);
    if(response.data == "ok") {
      alert("Registro de tienda exitoso");
      window.location.href = "negocios.html";
      txtNombre.value = "";
      txtUbicacion.value = "";
      txtDescripcion.value = "";
      txtTelefono.value = "";
    }
  })
  .catch(function (error) {
    console.error("Ocurrió un error al realizar la solicitud POST:", error);
  });

});