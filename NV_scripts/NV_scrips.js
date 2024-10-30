// Lista de palabras para el juego
const palabras = [
    { palabra: "PROGRAMAR", pista: "Actividad común en desarrollo de software" },
    { palabra: "ALGORITMO", pista: "Conjunto de pasos para resolver un problema" },
    { palabra: "INTERNET", pista: "Red global de computadoras" },
    { palabra: "JAVASCRIPT", pista: "Lenguaje de programación del lado del cliente" }
];

// Seleccionar una palabra aleatoria
const palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];
const palabraSecreta = palabraSeleccionada.palabra.toUpperCase();
const letrasAdivinadas = Array(palabraSecreta.length).fill("_");
let intentosRestantes = 6;
let puntuacion = 0;

// Variable para almacenar el nombre del jugador
let nombreJugador = "";

//  DOM
const ingresoNombre = document.querySelector(".ingreso-nombre");
const contenedorJuego = document.querySelector(".contenedor");
const contenedorPalabra = document.querySelector(".contenedor-palabra");
const letrasIncorrectasContenedor = document.querySelector(".letras-incorrectas .letras");
const inputLetra = document.getElementById("letra");
const botonProbarLetra = document.getElementById("boton-letra");
const partesAhorcado = document.querySelectorAll(".dibujo-ahorcado div");
const pistaElemento = document.getElementById("pista");
const botonReiniciar = document.getElementById("boton-reiniciar");
const puntuacionElemento = document.getElementById("puntuacion");
const intentosElemento = document.getElementById("intentos");
const botonIniciarJuego = document.getElementById("iniciar_juego");
const inputNombreJugador = document.getElementById("nombre_inicial");

// Mostrar pista y palabra oculta al inicio
pistaElemento.textContent = `Pista: ${palabraSeleccionada.pista}`;
function mostrarPalabra() {
    contenedorPalabra.innerHTML = letrasAdivinadas.map(letra => `<span class="letra">${letra}</span>`).join("");
}
mostrarPalabra();

// Función para iniciar el juego después de ingresar el nombre
botonIniciarJuego.addEventListener("click", () => {
    nombreJugador = inputNombreJugador.value.trim();

    if (nombreJugador === "") {
        alert("Por favor, ingresa tu nombre para comenzar.");
        return;
    }

    // Ocultar formulario de ingreso de nombre y mostrar el juego
    ingresoNombre.style.display = "none";
    contenedorJuego.style.display = "block";
});

// Verificar letra
botonProbarLetra.addEventListener("click", () => {
    const letra = inputLetra.value.toUpperCase();

    if (!letra || letra.length !== 1 || !/^[A-ZÑ]$/.test(letra)) {
        alert("Ingresa una letra válida");
        return;
    }

    inputLetra.value = ""; 
    if (palabraSecreta.includes(letra)) {
        actualizarPalabra(letra);
        actualizarPuntuacion();
    } else {
        agregarLetraIncorrecta(letra);
    }

    verificarFinDelJuego();
});

// Actualizar letras correctas
function actualizarPalabra(letra) {
    palabraSecreta.split("").forEach((char, index) => {
        if (char === letra) letrasAdivinadas[index] = letra;
    });
    mostrarPalabra();
}

// Actualizar la puntuación por letra correcta
function actualizarPuntuacion() {
    puntuacion += 10;
    puntuacionElemento.textContent = `Puntuación: ${puntuacion}`;
}

// Agregar letra incorrecta
function agregarLetraIncorrecta(letra) {
    if (!letrasIncorrectasContenedor.textContent.includes(letra)) {
        letrasIncorrectasContenedor.textContent += ` ${letra}`;
        mostrarParteAhorcado();
    }
}

// Mostrar las partes del ahorcado en orden
function mostrarParteAhorcado() {
    const ordenPartes = ["cabeza", "cuerpo", "pierna-derecha", "pierna-izquierda", "brazo-derecho", "brazo-izquierdo"];
    const parteActual = document.querySelector(`.${ordenPartes[6 - intentosRestantes]}`);
    if (parteActual) parteActual.style.display = "block";
    intentosRestantes--;
    intentosElemento.textContent = `Intentos Restantes: ${intentosRestantes}`;
}

/// Guardar la puntuación en el servidor
function guardarPuntuacion(nombre, puntuacion) {
    fetch('NV_php/NV_puntuacion.php', {  
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `nombre_jugador=${encodeURIComponent(nombre)}&puntaje=${encodeURIComponent(puntuacion)}`, 
    })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error('Error al guardar la puntuación:', error));
}

// Verificar si se ha ganado o perdido
function verificarFinDelJuego() {
    if (!letrasAdivinadas.includes("_")) {
        alert(`¡Felicidades, ${nombreJugador}! Has ganado con una puntuación de ${puntuacion}.`);
        guardarPuntuacion(nombreJugador, puntuacion); // Guardar puntuación al ganar
    } else if (intentosRestantes === 0) {
        alert(`Has perdido, ${nombreJugador}. La palabra era: ${palabraSecreta}. Puntuación final: ${puntuacion}.`);
        guardarPuntuacion(nombreJugador, puntuacion); // Guardar puntuación al perder
    }
}

// Botón de Reinicio
botonReiniciar.addEventListener("click", () => {
    location.reload(); 
});
