// ============================
// Variables de estado
// ============================

let puntosUsuario = 0;
let puntosPC = 0;

// ============================
// Referencias al DOM
// ============================

const mensaje = document.getElementById("mensaje");
const elecciones = document.getElementById("elecciones");
const marcadorUsuario = document.getElementById("puntos-jugador");
const marcadorPC = document.getElementById("puntos-computadora");

const botones = document.querySelectorAll(".boton-opcion");

// ============================
// Función principal del juego
// ============================

function jugar(opcionUsuario) {

    // Opciones disponibles
    const opciones = ["piedra", "papel", "tijera"];

    // La computadora elige una opción aleatoria
    const indexPC = Math.floor(Math.random() * 3);
    const opcionPC = opciones[indexPC];

    // Determinar el resultado
    if (opcionUsuario === opcionPC) {

        mensaje.innerText = "🤝 ¡Es un empate!";

    } else if (

        (opcionUsuario === "piedra" && opcionPC === "tijera") ||
        (opcionUsuario === "papel" && opcionPC === "piedra") ||
        (opcionUsuario === "tijera" && opcionPC === "papel")

    ) {

        puntosUsuario++;
        mensaje.innerText = "🎉 ¡Ganaste este punto!";

    } else {

        puntosPC++;
        mensaje.innerText = "🤖 ¡La computadora ganó este punto!";

    }

    // Actualizar la interfaz
    actualizarInterfaz(opcionUsuario, opcionPC);
}

// ============================
// Actualizar marcador y jugadas
// ============================

function actualizarInterfaz(usuario, pc) {

    elecciones.innerText =
        `Tú elegiste: ${usuario} | La PC eligió: ${pc}`;

    marcadorUsuario.innerText = puntosUsuario;
    marcadorPC.innerText = puntosPC;
}

// ============================
// Eventos de los botones
// ============================

botones.forEach(boton => {

    boton.addEventListener("click", () => {

        jugar(boton.id);

    });

});