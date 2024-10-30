<?php

include '../NV_config/NV_config.php';  

// Verificar si se enviaron los datos requeridos
if (!empty($_POST['nombre_jugador']) && !empty($_POST['puntaje'])) {
    $nombre_jugador = $_POST['nombre_jugador'];
    $puntaje = (int) $_POST['puntaje']; 

    try {
        // Preparar la consulta SQL para insertar la puntuación
        $sql = "INSERT INTO puntajes (nombre_jugador, puntaje) VALUES (:nombre_jugador, :puntaje)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':nombre_jugador', $nombre_jugador, PDO::PARAM_STR);
        $stmt->bindParam(':puntaje', $puntaje, PDO::PARAM_INT);
        
        // Ejecutar la consulta
        if ($stmt->execute()) {
            echo "Puntuación guardada con éxito";
        } else {
            echo "Error al guardar la puntuación";
        }
    } catch (PDOException $e) {
        echo "Error en la consulta: " . $e->getMessage();
    }
} else {
    echo "Datos incompletos";
}
?>
