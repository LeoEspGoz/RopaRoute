let txtUser = document.getElementById("txtUser");
let txtCorreo = document.getElementById("txtCorreo");
let txtPassword = document.getElementById("txtPassword");
let txtDireccion = document.getElementById("txtDireccion");
let rbtnVendedor = document.getElementById("rbtnVendedor");
let rbtnComprador = document.getElementById("rbtnComprador");
let btnRegistro = document.getElementById("btnRegistro");

function registrarNuevoUsuario() {
  // Obtener los valores de los campos
  const usuario = txtUser.value.trim();
  const correo = txtCorreo.value.trim();
  const contraseña = txtPassword.value.trim();
  const direccion = txtDireccion.value.trim();
  
  // Validar que ningún campo esté vacío
  if (usuario === '' || correo === '' || contraseña === '' || direccion === '') {
    alert("Por favor, completa todos los campos.");
    return;
  }

  // Validar el formato del correo electrónico
  const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!correoRegex.test(correo)) {
    alert("Por favor, ingresa un correo electrónico válido.");
    return;
  }

  // Validar que la contraseña tenga al menos 5 caracteres
  if (contraseña.length < 5) {
    alert("La contraseña debe tener al menos 5 caracteres.");
    return;
  }

  let rol = "Vendedor";
  if (rbtnComprador.checked) {
    rol = "Comprador";
  }

  axios
    .post("http://localhost:3000/registro", {
      user: usuario,
      password: contraseña,
      correo: correo,
      direccion: direccion,
      rol: rol
    })
    .then(function (response) {
      console.log("Respuesta del servidor:", response.data);
      if (response.data === "ok") {
        alert("Registro exitoso, por favor inicia sesión");
        window.location.href = "./login.html";
      }
    })
    .catch(function (error) {
      console.error("Ocurrió un error al realizar la solicitud POST:", error);
    });
}

btnRegistro.addEventListener("click", (e) => {
  e.preventDefault();
  registrarNuevoUsuario();
});
