const btnChat = document.getElementById("btnChat");
const cerrarChatBtn = document.getElementById("cerrarChat");
const chatModal = document.getElementById("chatModal");
const chatMensajes = document.getElementById("chatMensajes");
const chatInput = document.getElementById("chatInput");
const enviarChatBtn = document.getElementById("enviarChat");

let sessionChat = JSON.parse(localStorage.getItem("dsijuniors_session"));
if (!sessionChat) {
    location.href = "login.html";
}

let mensajesChat = JSON.parse(localStorage.getItem("dsijuniors_chat")) || [];

btnChat.addEventListener("click", function () {
    abrirChat();
});

cerrarChatBtn.addEventListener("click", function () {
    cerrarChat();
});

enviarChatBtn.addEventListener("click", function () {
    enviarMensaje();
});

chatInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        enviarMensaje();
    }
});

function abrirChat() {
    chatModal.classList.remove("hidden");
    renderMensajes();
}

function cerrarChat() {
    chatModal.classList.add("hidden");
}

function renderMensajes() {
    chatMensajes.innerHTML = "";

    mensajesChat
        .filter(m => m.userId === sessionChat.id || m.userId === "bot")
        .forEach(msg => {
            let div = document.createElement("div");
            div.classList.add("msg");

            if (msg.userId === sessionChat.id) {
                div.classList.add("me");
            } else {
                div.classList.add("other");
            }

            div.textContent = msg.texto;
            chatMensajes.appendChild(div);
        });

    chatMensajes.scrollTop = chatMensajes.scrollHeight;
}

function enviarMensaje() {
    if (chatInput.value.trim() === "") return;

    let textoUsuario = chatInput.value.trim();

    mensajesChat.push({
        userId: sessionChat.id,
        texto: textoUsuario,
        fecha: Date.now()
    });

    let respuesta = generarRespuesta(textoUsuario);

    mensajesChat.push({
        userId: "bot",
        texto: respuesta,
        fecha: Date.now()
    });

    localStorage.setItem("dsijuniors_chat", JSON.stringify(mensajesChat));

    chatInput.value = "";
    renderMensajes();
}

function generarRespuesta(texto) {
    let msg = texto.toLowerCase();

    if (msg.includes("oferta")) {
        return "Puedes ver y postular a las ofertas desde tu dashboard.";
    }

    if (msg.includes("perfil")) {
        return "Puedes actualizar tu perfil en la sección Mi Perfil.";
    }

    if (msg.includes("empresa")) {
        return "Las empresas pueden publicar ofertas y ver postulaciones.";
    }

    if (msg.includes("desarrollador")) {
        return "Los desarrolladores pueden postular a ofertas disponibles.";
    }

    if (msg.includes("hola")) {
        return "Hola " + sessionChat.nombre + ", ¿en qué puedo ayudarte?";
    }

    return "Mensaje recibido. Un miembro del equipo DSIJuniors te responderá.";
}