const db = require('../../db/db');

// Obtener todos los acudientes
const getContrasena = async (req, res) => {
    try {
        const result = await db.query('SELECT contrasena_admin FROM seguridad WHERE id = 1');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener contraseña:', error);
        res.status(500).json({ message: 'Error interno del servidor al obtener contraseña.' });
    }
};

module.exports = {
    getContrasena,
};
