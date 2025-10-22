// src/controllers/grados.controller.js
const db = require('../../db/db');

// Obtener todos los grados
const getGrados = async (req, res) => {
    try {
        // Podrías usar un JOIN para obtener el nombre del docente asociado:
        const result = await db.query(
            `SELECT 
                g.id_grado, 
                g.nombre_grado, 
                g.id_docente,
                d.nombre AS nombre_docente,
                d.apellido AS apellido_docente
             FROM grados g
             LEFT JOIN docentes d ON g.id_docente = d.id_docente
             ORDER BY g.nombre_grado`
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener grados:', error);
        res.status(500).json({ message: 'Error interno del servidor al obtener grados.' });
    }
};

// Obtener un grado por ID
const getGradoById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query(
            `SELECT 
                g.id_grado, 
                g.nombre_grado, 
                g.id_docente,
                d.nombre AS nombre_docente,
                d.apellido AS apellido_docente
             FROM grados g
             LEFT JOIN docentes d ON g.id_docente = d.id_docente
             WHERE g.id_grado = $1`, 
             [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Grado no encontrado.' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener grado por ID:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

// Crear un nuevo grado
// Crear un nuevo grado con ID basado en el máximo existente + 1
const createGrado = async (req, res) => {
    const { nombre_grado, id_docente } = req.body;

    try {
        // Validar campos obligatorios
        if (!nombre_grado || !id_docente) {
            return res.status(400).json({ message: 'El nombre del grado y el ID del docente son obligatorios.' });
        }

        // Calcular el siguiente ID
        const idResult = await db.query('SELECT COALESCE(MAX(id_grado), 0) + 1 AS next_id FROM grados');
        const nextId = idResult.rows[0].next_id;

        // Insertar el nuevo grado con el ID calculado
        const result = await db.query(
            `INSERT INTO grados (id_grado, nombre_grado, id_docente)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [nextId, nombre_grado, id_docente]
        );

        res.status(201).json({
            message: `Grado creado exitosamente con ID ${nextId}.`,
            grado: result.rows[0],
        });
    } catch (error) {
        console.error('Error al crear grado:', error);

        // Manejo más claro de errores de llave foránea (por si el id_docente no existe)
        if (error.code === '23503') {
            return res.status(400).json({ message: 'El docente especificado no existe.' });
        }

        res.status(500).json({ message: 'Error interno del servidor al crear grado.' });
    }
};


// Actualizar un grado
const updateGrado = async (req, res) => {
    const { id } = req.params;
    const { nombre_grado, id_docente } = req.body;
    try {
        const result = await db.query(
            `UPDATE grados SET 
             nombre_grado = $1, id_docente = $2
             WHERE id_grado = $3 RETURNING *`,
            [nombre_grado, id_docente, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Grado no encontrado para actualizar.' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        // Posiblemente un error de FK (id_docente no existe)
        console.error('Error al actualizar grado:', error);
        res.status(500).json({ message: 'Error interno del servidor al actualizar.' });
    }
};

// Eliminar un grado
const deleteGrado = async (req, res) => {
    const { id } = req.params;
    try {
        // Nota: Si la tabla 'estudiantes' tiene una FK a 'grados', la eliminación fallará.
        const result = await db.query('DELETE FROM grados WHERE id_grado = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Grado no encontrado para eliminar.' });
        }
        res.status(204).send(); // 204 No Content
    } catch (error) {
        console.error('Error al eliminar grado:', error);
        res.status(500).json({ message: 'Error interno del servidor al eliminar grado.' });
    }
};

module.exports = {
    getGrados,
    getGradoById,
    createGrado,
    updateGrado,
    deleteGrado,
}; 
