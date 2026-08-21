// ===============================
// PREGUNTAS
// ===============================

const PREGUNTAS = [
    {
      pregunta: "¿Qué dispositivo se utiliza para controlar el cursor en la pantalla?",
      opciones: ["Teclado", "Monitor", "Mouse", "Impresora"],
      correcta: 2,
      categoria: "🖱️ Hardware",
      explicacion: "El mouse permite mover el cursor y seleccionar elementos en la pantalla."
    },
    {
      pregunta: "¿Cuál es el navegador web desarrollado por Google?",
      opciones: ["Firefox", "Safari", "Google Chrome", "Edge"],
      correcta: 2,
      categoria: "🌐 Internet",
      explicacion: "Google Chrome es el navegador creado por Google."
    },
    {
      pregunta: "¿Qué significa CPU?",
      opciones: [
        "Central Process Unit",
        "Central Processing Unit",
        "Computer Power Unit",
        "Control Program Unit"
      ],
      correcta: 1,
      categoria: "💻 Hardware",
      explicacion: "CPU significa Central Processing Unit."
    },
    {
      pregunta: "¿Cuál de los siguientes es un sistema operativo?",
      opciones: ["Microsoft Word", "Windows", "Google", "Excel"],
      correcta: 1,
      categoria: "🖥️ Sistemas Operativos",
      explicacion: "Windows es un sistema operativo."
    },
    {
      pregunta: "¿Qué programa se utiliza para crear presentaciones?",
      opciones: ["Excel", "PowerPoint", "Word", "Paint"],
      correcta: 1,
      categoria: "📄 Ofimática",
      explicacion: "PowerPoint sirve para crear presentaciones."
    },
    {
      pregunta: "¿Qué tecla borra el carácter anterior?",
      opciones: ["Enter", "Shift", "Backspace", "Ctrl"],
      correcta: 2,
      categoria: "⌨️ Teclado",
      explicacion: "Backspace elimina el carácter anterior."
    },
    {
      pregunta: "¿Cuál de estos dispositivos es de salida?",
      opciones: ["Teclado", "Mouse", "Monitor", "Micrófono"],
      correcta: 2,
      categoria: "🖥️ Hardware",
      explicacion: "El monitor muestra la información."
    },
    {
      pregunta: "¿Qué extensión tiene un documento de Word?",
      opciones: [".jpg", ".mp3", ".docx", ".png"],
      correcta: 2,
      categoria: "📂 Archivos",
      explicacion: "Los documentos de Word usan .docx."
    },
    {
      pregunta: "¿Qué significa HTML?",
      opciones: [
        "HyperText Markup Language",
        "High Transfer Machine Language",
        "Home Tool Markup Language",
        "Hyper Tool Modern Language"
      ],
      correcta: 0,
      categoria: "🌍 Desarrollo Web",
      explicacion: "HTML se utiliza para crear páginas web."
    },
    {
      pregunta: "¿Qué programa protege contra virus?",
      opciones: ["Calculadora", "Antivirus", "Paint", "Bloc de notas"],
      correcta: 1,
      categoria: "🔒 Seguridad",
      explicacion: "Un antivirus protege el equipo de amenazas."
    }
  ];
  
  // ===============================
  // VARIABLES
  // ===============================
  
  const TIEMPO_LIMITE = 15;
  
  let estado = {
    indice: 0,
    puntaje: 0,
    respondida: false,
    temporizadorId: null,
    preguntasMezcladas: []
  };
  
  // ===============================
  // MEZCLAR PREGUNTAS
  // ===============================
  
  function mezclar(array) {
    const copia = [...array];
  
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
  
    return copia;
  }
  
  // ===============================
  // CAMBIAR PANTALLAS
  // ===============================
  
  function mostrarPantalla(idVisible) {
  
    document.getElementById("pantalla-inicio").classList.add("oculto");
    document.getElementById("pantalla-juego").classList.add("oculto");
    document.getElementById("pantalla-resultado").classList.add("oculto");
  
    document.getElementById(idVisible).classList.remove("oculto");
  }
  
  // ===============================
  // INICIAR JUEGO
  // ===============================
  
  function iniciarJuego() {
  
    estado.indice = 0;
    estado.puntaje = 0;
    estado.respondida = false;
  
    estado.preguntasMezcladas = mezclar(PREGUNTAS);
  
    document.getElementById("puntaje-actual").textContent = "0";
    document.getElementById("total-preguntas").textContent = estado.preguntasMezcladas.length;
  
    mostrarPantalla("pantalla-juego");
  
    mostrarPregunta();
  }
  
  // ===============================
  // MOSTRAR PREGUNTA
  // ===============================
  
  function mostrarPregunta() {
  
    clearInterval(estado.temporizadorId);
  
    estado.respondida = false;
  
    const pregunta = estado.preguntasMezcladas[estado.indice];
  
    document.getElementById("num-actual").textContent = estado.indice + 1;
  
    document.getElementById("categoria").textContent = pregunta.categoria;
  
    document.getElementById("pregunta-texto").textContent = pregunta.pregunta;
  
    document.getElementById("feedback").classList.add("oculto");
  
    document.getElementById("btn-siguiente").classList.add("oculto");
  
    document.getElementById("barra-fill").style.width =
      ((estado.indice + 1) / estado.preguntasMezcladas.length) * 100 + "%";
  
    const opciones = document.getElementById("opciones");
  
    opciones.innerHTML = "";
  
    pregunta.opciones.forEach((texto, indice) => {
  
      const boton = document.createElement("button");
  
      boton.className = "opcion";
  
      boton.innerHTML = `<span class="letra">${"ABCD"[indice]}</span> ${texto}`;
  
      boton.onclick = () => responder(indice);
  
      opciones.appendChild(boton);
  
    });
  
    iniciarTemporizador();
  }
  
  // ===============================
  // RESPONDER
  // ===============================
  
  function responder(indiceElegido) {
  
    if (estado.respondida) return;
  
    estado.respondida = true;
  
    clearInterval(estado.temporizadorId);
  
    const pregunta = estado.preguntasMezcladas[estado.indice];
  
    const botones = document.querySelectorAll(".opcion");
  
    botones.forEach(b => b.disabled = true);
  
    if (indiceElegido === pregunta.correcta) {
  
      botones[indiceElegido].classList.add("correcto");
  
      estado.puntaje += 100;
  
      mostrarFeedback(true, pregunta.explicacion);
  
    } else {
  
      if (indiceElegido >= 0) {
        botones[indiceElegido].classList.add("incorrecto");
      }
  
      botones[pregunta.correcta].classList.add("correcto");
  
      mostrarFeedback(false, pregunta.explicacion);
  
    }
  
    document.getElementById("puntaje-actual").textContent = estado.puntaje;
  
    document.getElementById("btn-siguiente").classList.remove("oculto");
  }
  
  // ===============================
  // TEMPORIZADOR
  // ===============================
  
  function iniciarTemporizador() {
  
    let tiempo = TIEMPO_LIMITE;
  
    const reloj = document.getElementById("tiempo");
  
    reloj.textContent = tiempo;
    reloj.style.color = "white";
  
    estado.temporizadorId = setInterval(() => {
  
      tiempo--;
  
      reloj.textContent = tiempo;
  
      if (tiempo <= 10) reloj.style.color = "#facc15";
  
      if (tiempo <= 5) reloj.style.color = "#ef4444";
  
      if (tiempo <= 0) {
  
        clearInterval(estado.temporizadorId);
  
        responder(-1);
  
      }
  
    }, 1000);
  
  }
  // ===============================
// MOSTRAR FEEDBACK
// ===============================

function mostrarFeedback(correcto, explicacion) {

    const feedback = document.getElementById("feedback");
  
    feedback.classList.remove("oculto");
  
    if (correcto) {
      feedback.innerHTML = `
        <h3>✅ ¡Correcto!</h3>
        <p>${explicacion}</p>
      `;
      feedback.style.color = "#22c55e";
    } else {
      feedback.innerHTML = `
        <h3>❌ Incorrecto</h3>
        <p>${explicacion}</p>
      `;
      feedback.style.color = "#ef4444";
    }
  
  }
  
  // ===============================
  // SIGUIENTE PREGUNTA
  // ===============================
  
  function siguientePregunta() {
  
    estado.indice++;
  
    if (estado.indice >= estado.preguntasMezcladas.length) {
  
      mostrarResultado();
  
    } else {
  
      mostrarPregunta();
  
    }
  
  }
  
  // ===============================
  // MOSTRAR RESULTADO FINAL
  // ===============================
  
  function mostrarResultado() {
  
    clearInterval(estado.temporizadorId);
  
    mostrarPantalla("pantalla-resultado");
  
    document.getElementById("puntaje-final").textContent = estado.puntaje;
  
    const emoji = document.getElementById("resultado-emoji");
    const mensaje = document.getElementById("mensaje-resultado");
  
    if (estado.puntaje == 1000) {
  
      emoji.textContent = "🏆";
      mensaje.textContent = "¡Perfecto! Respondiste todas correctamente.";
  
    } else if (estado.puntaje >= 700) {
  
      emoji.textContent = "🥇";
      mensaje.textContent = "¡Excelente trabajo!";
  
    } else if (estado.puntaje >= 500) {
  
      emoji.textContent = "👍";
      mensaje.textContent = "Buen resultado. Sigue practicando.";
  
    } else {
  
      emoji.textContent = "📚";
      mensaje.textContent = "Puedes mejorar. ¡Vuelve a intentarlo!";
  
    }
  
    guardarRecord(estado.puntaje);
  
  }
  
  // ===============================
  // GUARDAR RECORD
  // ===============================
  
  function guardarRecord(puntaje) {
  
    let record = Number(localStorage.getItem("trivia-record")) || 0;
  
    if (puntaje > record) {
  
      record = puntaje;
  
      localStorage.setItem("trivia-record", record);
  
    }
  
    document.getElementById("record-display").textContent = record;
  
  }
  
  // ===============================
  // REINICIAR
  // ===============================
  
  function reiniciar() {
  
    estado.indice = 0;
    estado.puntaje = 0;
    estado.respondida = false;
  
    clearInterval(estado.temporizadorId);
  
    mostrarPantalla("pantalla-inicio");
  
  }
  
  // ===============================
  // CARGAR RECORD AL ABRIR
  // ===============================
  
  window.onload = function () {
  
    document.getElementById("record-display").textContent =
      localStorage.getItem("trivia-record") || 0;
  
    document.getElementById("total-preguntas").textContent =
      PREGUNTAS.length;
  
  };