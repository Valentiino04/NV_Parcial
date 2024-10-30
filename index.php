
<?php
include 'NV_config/NV_config.php';
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>El Ahorcado</title>
    <link rel="stylesheet" href="NV_css/NV_estilos.css">
</head>
<body>
    <!-- Formulario de ingreso de nombre al inicio del juego -->
    <div class="ingreso-nombre">
        <label for="nombre_inicial">Ingresa tu nombre para comenzar el juego:</label>
        <input type="text" id="nombre_inicial" maxlength="50" required>
        <button id="iniciar_juego">Iniciar Juego</button>
    </div>

    <!-- Contenedor principal del juego  -->
    <div class="contenedor" style="display: none;">
        <h1>Juego del Ahorcado</h1>
        <p id="pista"></p>

        <!-- Puntuación e Intentos Restantes -->
        <div class="estado-juego">
            <p id="puntuacion">Puntuación: 0</p>
            <p id="intentos">Intentos Restantes: 6</p>
        </div>

        <!-- Área de la Palabra Oculta -->
        <div class="contenedor-palabra"></div>

        <!-- Letras Incorrectas -->
        <div class="letras-incorrectas">
            <p>Letras Incorrectas:</p>
            <div class="letras"></div>
        </div>

        <!-- Dibujo del Ahorcado -->
        <div class="dibujo-ahorcado">
            <div class="base"></div>
            <div class="soga"></div>
            <div class="cabeza"></div>
            <div class="cuerpo"></div>
            <div class="pierna-derecha"></div>
            <div class="pierna-izquierda"></div>
            <div class="brazo-derecho"></div>
            <div class="brazo-izquierdo"></div>
        </div>

        <!-- Área de Ingreso de Letras -->
        <div class="entrada-letra">
            <label for="letra">Ingresa una letra:</label>
            <input type="text" id="letra" maxlength="1">
            <button id="boton-letra">Probar Letra</button>
        </div>

        <!-- Botón de Reinicio -->
        <div class="reiniciar-juego">
            <button id="boton-reiniciar">Reiniciar Juego</button>
        </div>
    </div>

    <script src="NV_scripts/NV_scrips.js"></script>
</body>
</html>
