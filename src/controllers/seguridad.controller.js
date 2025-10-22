// src/controllers/seguridad.controller.js

// 💡 NOTA: La ruta '../db/db' ASUME que:
// 1. El archivo actual está en 'src/controllers/'
// 2. El archivo de conexión está en 'db/db.js' (desde la raíz)
const db = require('../../db/db'); 

// Función para obtener la contraseña
const getContrasenaAdmin = async (req, res) => {
    try {
        // Consulta la tabla 'seguridad' para obtener el valor de 'contrasena_admin'
        // Usamos WHERE id = 1 porque solo tienes un registro de contraseña.
        const result = await db.query(
            'SELECT contrasena_admin FROM seguridad WHERE id = 1'
        );

        if (result.rows.length === 0) {
            // Si el registro no existe, podría indicar un error de configuración.
            console.error("El registro de contraseña (id=1) no se encontró en la tabla 'seguridad'.");
            return res.status(500).json({ error: 'Registro de seguridad no encontrado. Verifique la tabla.' });
        }

        const contrasena = result.rows[0].contrasena_admin;

        // Devuelve la contraseña en un objeto JSON con la clave 'contrasena_admin'.
        // Esta clave debe coincidir con la que espera tu servicio Flutter.
        res.status(200).json({ contrasena_admin: contrasena });

    } catch (error) {
        console.error('❌ Error al obtener la contraseña de seguridad desde la BD:', error);
        res.status(500).json({ error: 'Error interno del servidor al consultar la seguridad.' });
    }
};

module.exports = {
    getContrasenaAdmin,
};