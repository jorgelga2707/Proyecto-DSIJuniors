# PROYECTO DSIJUNIORS

Proyecto desarrollado para el curso de **Diseño Web en ISIL** y posteriormente **mejorado y ampliado** como una plataforma web funcional orientada a conectar **empresas** con **desarrolladores juniors** en el área de tecnología.

---

## 🚀 Descripción del proyecto

**DSIJuniors** es una plataforma web que tiene como objetivo principal **facilitar el acceso al primer empleo tecnológico** para desarrolladores juniors, permitiendo a las empresas publicar ofertas laborales y gestionar postulaciones de manera sencilla e intuitiva.

El proyecto simula el funcionamiento de un portal de empleo moderno, integrando diferentes roles de usuario, paneles personalizados, interacción dinámica y un diseño visual profesional.

---

## 🎯 Objetivo

- Conectar empresas con desarrolladores juniors.
- Reducir la brecha laboral en el rubro de Tecnologías de la Información.
- Ofrecer una experiencia clara, visual y accesible para ambos perfiles.
- Simular un sistema real de reclutamiento web.

---

## 👥 Tipos de usuario

### 🏢 Empresa
- Registro y login como empresa.
- Publicación de ofertas laborales.
- Visualización de postulaciones recibidas.
- Contacto directo con desarrolladores.
- Dashboard con estadísticas generales.

### 👨‍💻 Desarrollador
- Registro y login como desarrollador junior.
- Visualización de ofertas disponibles.
- Postulación a ofertas laborales.
- Seguimiento del estado de postulaciones.
- Gestión de perfil profesional.

---

## 🧩 Funcionalidades principales

- Landing page informativa (Misión, Visión, Lenguajes más usados, Habilidades blandas).
- Sistema de login con selección de tipo de usuario.
- Dashboard interactivo según el rol.
- Publicación y visualización de ofertas laborales.
- Gestión de postulaciones.
- Chat integrado (simulado) entre usuarios y plataforma.
- Interfaz moderna con diseño oscuro (dark UI).
- Navegación clara y consistente.

---

## 🖥️ Estructura del proyecto

```bash
DSIJuniors/
│
├── index.html
├── login.html
├── empresa.html
├── desarrollador.html
│── registro.html
│── blog.html
│── dashboard.html
│── perfil.html
│
├── JS/
│   ├── auth.js
│   ├── chatbot.js
│   ├── dashboard.js
│   ├── interactive.js
│   ├── login-register.js
│   └── perfil.js
│
├── CSS/
│   ├── style.css
│   ├── register.css
│   ├── perfil.css
│   ├── dahsboard.css
│   └── chatbot.css
│
├── data/
│   ├── chat.json
│   ├── dsijuniors_users.json
│   ├── ofertas.json
│   └── postulaciones.json
│
├── image/
│   ├── images/
│   └── icons/
│
└── README.md