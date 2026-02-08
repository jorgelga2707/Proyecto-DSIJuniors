let session = JSON.parse(localStorage.getItem("dsijuniors_session"));
if (!session) {
    location.href = "login.html";
}

const logoutBtn = document.getElementById("logout");
const nombreInput = document.getElementById("nombre");
const apellidoInput = document.getElementById("apellido");
const emailInput = document.getElementById("email");
const extraPerfil = document.getElementById("extraPerfil");
const perfilForm = document.getElementById("perfilForm");

let usuarios = JSON.parse(localStorage.getItem("dsijuniors_users")) || [];

let userIndex = usuarios.findIndex(u => u.id === session.id);
if (userIndex === -1) {
    localStorage.removeItem("dsijuniors_session");
    location.href = "login.html";
}

let usuario = usuarios[userIndex];

logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("dsijuniors_session");
    location.href = "login.html";
});

nombreInput.value = usuario.nombre || "";
apellidoInput.value = usuario.apellido || "";
emailInput.value = usuario.email || "";

if (!usuario.infoExtra) {
    usuario.infoExtra = {};
}

if (usuario.tipoCuenta === "Desarrollador") {
    extraPerfil.innerHTML = `
        <h3>Perfil profesional</h3>
        <div class="form-group">
            <label>Especialización</label>
            <input type="text" id="especializacion" value="${usuario.infoExtra.especializacion || ""}">
        </div>
        <div class="form-group">
            <label>Experiencia</label>
            <input type="text" id="experiencia" value="${usuario.infoExtra.experiencia || ""}">
        </div>
        <div class="form-group">
            <label>Portafolio (URL)</label>
            <input type="text" id="portafolio" value="${usuario.infoExtra.portafolio || ""}">
        </div>
        <div class="form-group">
            <label>Biografía</label>
            <textarea id="bio">${usuario.infoExtra.bio || ""}</textarea>
        </div>
    `;
} else if (usuario.tipoCuenta === "Empresa") {
    extraPerfil.innerHTML = `
        <h3>Datos de empresa</h3>
        <div class="form-group">
            <label>Nombre de la Empresa</label>
            <input type="text" id="empresa" value="${usuario.infoExtra.empresa || ""}">
        </div>
        <div class="form-group">
            <label>Rubro / Sector</label>
            <input type="text" id="rubro" value="${usuario.infoExtra.rubro || ""}">
        </div>
        <div class="form-group">
            <label>Descripción de la empresa</label>
            <textarea id="descripcion">${usuario.infoExtra.descripcion || ""}</textarea>
        </div>
        <div class="form-group">
            <label>RUC</label>
            <input type="text" id="ruc" value="${usuario.infoExtra.ruc || ""}">
        </div>
    `;
}

perfilForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (nombreInput.value.trim() === "" || apellidoInput.value.trim() === "") {
        alert("Nombre y apellido son obligatorios");
        return;
    }

    usuario.nombre = nombreInput.value.trim();
    usuario.apellido = apellidoInput.value.trim();

    if (usuario.tipoCuenta === "Desarrollador") {
        usuario.infoExtra.especializacion = document.getElementById("especializacion").value.trim();
        usuario.infoExtra.experiencia = document.getElementById("experiencia").value.trim();
        usuario.infoExtra.portafolio = document.getElementById("portafolio").value.trim();
        usuario.infoExtra.bio = document.getElementById("bio").value.trim();
    } else if (usuario.tipoCuenta === "Empresa") {
        usuario.infoExtra.empresa = document.getElementById("empresa").value.trim();
        usuario.infoExtra.rubro = document.getElementById("rubro").value.trim();
        usuario.infoExtra.descripcion = document.getElementById("descripcion").value.trim();
        usuario.infoExtra.ruc = document.getElementById("ruc").value.trim();
    }

    usuarios[userIndex] = usuario;
    localStorage.setItem("dsijuniors_users", JSON.stringify(usuarios));
    
    localStorage.setItem("dsijuniors_session", JSON.stringify(usuario));

    alert("Perfil actualizado correctamente ");
    location.href = "dashboard.html";
});