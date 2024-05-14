const user = document.getElementById("user");
const password = document.getElementById("password");
const btnLogin = document.getElementById("btnLogin");

localStorage.setItem("user", -1);
localStorage.setItem("rol", "?");

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();

  // Obtener los valores de los campos de usuario y contraseña
  const userInput = user.value.trim();
  const passwordInput = password.value.trim();

  // Verificar si los campos están vacíos
  if (userInput === '' || passwordInput === '') {
    alert("Por favor, completa todos los campos.");
    return; // Detener la ejecución si hay campos vacíos
  }

  // Si los campos no están vacíos, enviar la solicitud al servidor
  axios
    .post("http://localhost:3000/login", {
      user: userInput,
      password: passwordInput,
    })
    .then(function (response) {
      
      const responseData = response.data;

      if (responseData[0] === -1) {
        alert("Usuario o contraseña incorrectos.");
      } else {
        
        window.location.href = "./perfil.html";
        localStorage.setItem("user", responseData[0]);
        localStorage.setItem("rol", responseData[1]);
      }
    })
    .catch(function (error) {
      console.error("Ocurrió un error al realizar la solicitud POST:", error);
      alert("Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.");
    });
});

  
