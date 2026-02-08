let session = JSON.parse(localStorage.getItem("dsijuniors_session"));
if (!session) {
    location.href = "login.html";
}

let usuarios, ofertas, postulaciones;

function cargarDatosDesdeStorage() {
    usuarios = JSON.parse(localStorage.getItem("dsijuniors_users")) || [];
    ofertas = JSON.parse(localStorage.getItem("ofertas")) || [];
    postulaciones = JSON.parse(localStorage.getItem("postulaciones")) || [];
}

cargarDatosDesdeStorage();

const logoutBtn = document.getElementById("logout");
const userInfo = document.getElementById("userInfo");
const empresaPanel = document.getElementById("empresaPanel");
const devPanel = document.getElementById("devPanel");

const tituloOferta = document.getElementById("tituloOferta");
const descripcionOferta = document.getElementById("descripcionOferta");
const btnPublicar = document.getElementById("btnPublicar");

const listaOfertas = document.getElementById("listaOfertas");
const misPostulaciones = document.getElementById("misPostulaciones");
const postulacionesEmpresa = document.getElementById("postulacionesEmpresa");
const listaDevs = document.getElementById("listaDevs");

const usuarioActual = usuarios.find(u => u.id === session.id);
if (usuarioActual) {
    session = usuarioActual;
    localStorage.setItem("dsijuniors_session", JSON.stringify(session));
}

userInfo.innerHTML = `
    <p><strong>${session.nombre} ${session.apellido}</strong></p>
    <p><small>${session.tipoCuenta}</small></p>
`;

logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("dsijuniors_session");
    location.href = "login.html";
});

if (session.tipoCuenta === "Empresa") {
    empresaPanel.classList.remove("hidden");
    cargarPostulacionesEmpresa();
    cargarDesarrolladores();
} else if (session.tipoCuenta === "Desarrollador") {
    devPanel.classList.remove("hidden");
    cargarOfertas();
    cargarMisPostulaciones();
}

btnPublicar.addEventListener("click", function () {
    if (tituloOferta.value.trim() === "" || descripcionOferta.value.trim() === "") {
        alert("Por favor completa los campos de la oferta.");
        return;
    }

    const nuevaOferta = {
        id: Date.now(),
        empresaId: session.id,
        empresaNombre: session.infoExtra?.empresa || session.nombre,
        titulo: tituloOferta.value,
        descripcion: descripcionOferta.value
    };

    ofertas.push(nuevaOferta);
    localStorage.setItem("ofertas", JSON.stringify(ofertas));
    
    tituloOferta.value = "";
    descripcionOferta.value = "";
    
    alert("Oferta publicada con éxito");
    actualizarGrafico();
    if (typeof cargarPostulacionesEmpresa === "function") cargarPostulacionesEmpresa();
});

function cargarOfertas() {
    listaOfertas.innerHTML = "";
    if (ofertas.length === 0) {
        listaOfertas.innerHTML = "<p>No hay ofertas disponibles por ahora.</p>";
        return;
    }

    ofertas.forEach(oferta => {
        let yaPostulo = postulaciones.some(p => p.ofertaId === oferta.id && p.devId === session.id);

        let card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <h3>${oferta.titulo}</h3>
            <p><strong>Empresa:</strong> ${oferta.empresaNombre || 'DSI Partner'}</p>
            <p>${oferta.descripcion}</p>
            <button class="btn-postular" ${yaPostulo ? "disabled" : ""}>
                ${yaPostulo ? "Ya postulado" : "Postularme"}
            </button>
        `;

        if (!yaPostulo) {
            card.querySelector("button").onclick = function () {
                postulaciones.push({
                    id: Date.now(),
                    ofertaId: oferta.id,
                    devId: session.id,
                    fecha: new Date().toLocaleDateString()
                });

                localStorage.setItem("postulaciones", JSON.stringify(postulaciones));
                cargarOfertas();
                cargarMisPostulaciones();
                actualizarGrafico();
            };
        }
        listaOfertas.appendChild(card);
    });
}

function cargarMisPostulaciones() {
    misPostulaciones.innerHTML = "";
    const misFiltradas = postulaciones.filter(p => p.devId === session.id);
    
    if (misFiltradas.length === 0) {
        misPostulaciones.innerHTML = "<p>Aún no has postulado a ninguna vacante.</p>";
        return;
    }

    misFiltradas.forEach(p => {
        let oferta = ofertas.find(o => o.id === p.ofertaId);
        if (!oferta) return;

        let card = document.createElement("div");
        card.className = "card postulado";
        card.innerHTML = `
            <h4>${oferta.titulo}</h4>
            <p><small>Fecha: ${p.fecha}</small></p>
            <span class="badge">En proceso</span>
        `;
        misPostulaciones.appendChild(card);
    });
}

function cargarPostulacionesEmpresa() {
    postulacionesEmpresa.innerHTML = "";
    const postulacionesRecibidas = postulaciones.filter(p => {
        let oferta = ofertas.find(o => o.id === p.ofertaId);
        return oferta && oferta.empresaId === session.id;
    });

    if (postulacionesRecibidas.length === 0) {
        postulacionesEmpresa.innerHTML = "<p>No has recibido postulaciones todavía.</p>";
        return;
    }

    postulacionesRecibidas.forEach(p => {
        let oferta = ofertas.find(o => o.id === p.ofertaId);
        let dev = usuarios.find(u => u.id === p.devId);

        let card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <h4>${dev ? dev.nombre + ' ' + dev.apellido : 'Usuario'}</h4>
            <p><strong>Puesto:</strong> ${oferta.titulo}</p>
            <p><strong>Especialidad:</strong> ${dev?.infoExtra?.especializacion || "No especificada"}</p>
            <a href="mailto:${dev?.email}" class="btn-contacto">Contactar</a>
        `;
        postulacionesEmpresa.appendChild(card);
    });
}

function cargarDesarrolladores() {
    listaDevs.innerHTML = "";
    const devs = usuarios.filter(u => u.tipoCuenta === "Desarrollador");

    devs.forEach(dev => {
        let card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <h4>${dev.nombre} ${dev.apellido}</h4>
            <p><strong>Especialidad:</strong> ${dev.infoExtra?.especializacion || "N/A"}</p>
            <p><strong>Experiencia:</strong> ${dev.infoExtra?.experiencia || "N/A"}</p>
            <p><small>${dev.infoExtra?.bio || ""}</small></p>
        `;
        listaDevs.appendChild(card);
    });
}

const ctx = document.getElementById("graficoActividad");
let grafico;

function actualizarGrafico() {
    cargarDatosDesdeStorage();
    if (grafico) grafico.destroy();

    grafico = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Usuarios", "Ofertas", "Postulaciones"],
            datasets: [{
                label: 'Estadísticas de la plataforma',
                data: [usuarios.length, ofertas.length, postulaciones.length],
                backgroundColor: ['#3498db', '#2ecc71', '#f1c40f']
            }]
        },
        options: { 
            responsive: true,
            plugins: { legend: { display: false } } 
        }
    });
}

actualizarGrafico();