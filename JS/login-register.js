function getLocalUsers() {
  return JSON.parse(localStorage.getItem("dsijuniors_users")) || [];
}

function saveLocalUsers(users) {
  localStorage.setItem("dsijuniors_users", JSON.stringify(users));
}

let jsonCargado = false;

fetch("./data/dsijuniors_users.json")
  .then(res => {
    if (!res.ok) throw new Error("Error cargando JSON");
    return res.json();
  })
  .then(jsonUsers => {
    const localUsers = getLocalUsers();

    jsonUsers.forEach(j => {
      const existe = localUsers.some(u => u.email === j.email);
      if (!existe) {
        localUsers.push({
          id: j.id ?? Date.now(),
          nombre: j.nombre,
          apellido: j.apellido,
          email: j.email.toLowerCase(),
          usuario: j.usuario || j.email.toLowerCase(),
          pass: j.pass,
          tipoCuenta: j.tipoCuenta,
          infoExtra: j.infoExtra || {}
        });
      }
    });

    saveLocalUsers(localUsers);
    jsonCargado = true;
  })
  .catch(err => {
    console.error(err);
    jsonCargado = true;
  });

const captchaCanvas = document.createElement("canvas");
captchaCanvas.width = 160;
captchaCanvas.height = 45;
let captchaText = "";

function generarCaptcha() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  captchaText = "";

  for (let i = 0; i < 5; i++) {
    captchaText += chars[Math.floor(Math.random() * chars.length)];
  }

  const ctx = captchaCanvas.getContext("2d");
  ctx.clearRect(0, 0, captchaCanvas.width, captchaCanvas.height);
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, captchaCanvas.width, captchaCanvas.height);
  ctx.font = "24px Arial";
  ctx.fillStyle = "#000";
  ctx.fillText(captchaText, 20, 30);
}

generarCaptcha();

const formRegister = document.getElementById("formRegister");

if (formRegister) {
  formRegister.addEventListener("submit", e => {
    e.preventDefault();

    const nombre = formRegister.nombre.value.trim();
    const apellido = formRegister.apellido.value.trim();
    const email = formRegister.email.value.trim().toLowerCase();
    const password = formRegister.password.value;
    const password2 = formRegister.password2.value;
    const tipoRaw = formRegister.tipoCuenta.value;

    if (!nombre || !apellido || !email || !password) {
      alert("Completa todos los campos");
      return;
    }

    if (password !== password2) {
      alert("Las contraseñas no coinciden");
      return;
    }

    if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    const usuarios = getLocalUsers();

    if (usuarios.some(u => u.email === email)) {
      alert("Este usuario ya existe");
      return;
    }

    const tipoCuenta =
      tipoRaw.charAt(0).toUpperCase() + tipoRaw.slice(1).toLowerCase();

    usuarios.push({
      id: Date.now(),
      nombre,
      apellido,
      email,
      usuario: email,
      pass: password,
      tipoCuenta,
      infoExtra: {}
    });

    saveLocalUsers(usuarios);
    alert("Registro exitoso ✅");
    window.location.href = "login.html";
  });
}

const formLogin = document.getElementById("formLogin");

if (formLogin) {

  const captchaWrapper = document.createElement("div");
  captchaWrapper.className = "captcha-container";

  const captchaInput = document.createElement("input");
  captchaInput.placeholder = "Ingrese captcha";
  captchaInput.required = true;

  const reloadBtn = document.createElement("button");
  reloadBtn.type = "button";
  reloadBtn.textContent = "Recargar captcha";

  captchaWrapper.append(captchaCanvas, captchaInput, reloadBtn);

  const btnContainer = formLogin.querySelector(".login__btn--container");
  formLogin.insertBefore(captchaWrapper, btnContainer);

  reloadBtn.onclick = () => {
    generarCaptcha();
    captchaInput.value = "";
  };

  formLogin.addEventListener("submit", e => {
    e.preventDefault();

    if (!jsonCargado) {
      alert("Cargando usuarios, intenta nuevamente");
      return;
    }

    const tipo = document.getElementById("festado").value;
    const userInput = document.getElementById("fuser").value.trim().toLowerCase();
    const passInput = document.getElementById("fpassword").value;
    const captchaValue = captchaInput.value.trim().toUpperCase();

    if (!tipo || !userInput || !passInput) {
      alert("Completa todos los campos");
      return;
    }

    if (captchaValue !== captchaText) {
      alert("Captcha incorrecto");
      generarCaptcha();
      captchaInput.value = "";
      return;
    }

    const tipoCuenta =
      tipo.charAt(0).toUpperCase() + tipo.slice(1).toLowerCase();

    const usuarios = getLocalUsers();

    const usuarioValido = usuarios.find(u =>
      (u.email === userInput || u.usuario === userInput) &&
      u.pass === passInput &&
      u.tipoCuenta === tipoCuenta
    );

    if (!usuarioValido) {
      alert("Credenciales incorrectas");
      generarCaptcha();
      return;
    }

    localStorage.setItem(
      "dsijuniors_session",
      JSON.stringify(usuarioValido)
    );

    alert(`Bienvenido ${usuarioValido.nombre}`);
    window.location.href = "dashboard.html";
  });
}

const headerLogin = document.querySelector(".header-login");

if (headerLogin) {
  window.addEventListener("scroll", () => {
    headerLogin.classList.toggle("scrolled", window.scrollY > 10);
  });
}