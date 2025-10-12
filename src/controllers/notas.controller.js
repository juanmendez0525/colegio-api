const db = require('../../db/db');

// Obtener todas las notas (listado general)
const getNotas = async (req, res) => {
    try {
        const result = await db.query(
            `SELECT 
                n.id_nota, 
                n.id_estudiante, 
                n.id_materia,
                n.periodo, 
                n.calificacion,
                e.nombre AS nombre_estudiante,
                e.apellido AS apellido_estudiante,
                m.nombre_materia AS nombre_materia
             FROM notas n
             LEFT JOIN estudiantes e ON n.id_estudiante = e.id_estudiante
             LEFT JOIN materias m ON n.id_materia = m.id_materia
             ORDER BY n.id_estudiante, n.periodo`
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener notas:', error);
        res.status(500).json({ message: 'Error interno del servidor al obtener notas.' });
    }
};

// Obtener una nota por ID
const getNotaById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query(
            `SELECT 
                n.id_nota, 
                n.id_estudiante, 
                n.id_materia,
                n.periodo, 
                n.calificacion,
                e.nombre AS nombre_estudiante,
                e.apellido AS apellido_estudiante,
                m.nombre_materia AS nombre_materia
             FROM notas n
             LEFT JOIN estudiantes e ON n.id_estudiante = e.id_estudiante
             LEFT JOIN materias m ON n.id_materia = m.id_materia
             WHERE n.id_nota = $1`, 
             [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Nota no encontrada.' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener nota por ID:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

// Crear una nueva nota
// Crear una nueva nota con ID calculado (MAX + 1)
const createNota = async (req, res) => {
    const { id_estudiante, id_materia, periodo, calificacion } = req.body;

    try {
        // Validar campos requeridos
        if (!id_estudiante || !id_materia || !periodo || calificacion == null) {
            return res.status(400).json({ 
                message: 'Todos los campos (id_estudiante, id_materia, periodo, calificacion) son obligatorios.' 
            });
        }

        // Calcular el siguiente ID disponible
        const idResult = await db.query('SELECT COALESCE(MAX(id_nota), 0) + 1 AS next_id FROM notas');
        const nextId = idResult.rows[0].next_id;

        // Insertar la nota con el nuevo ID
        const result = await db.query(
            `INSERT INTO notas (id_nota, id_estudiante, id_materia, periodo, calificacion)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [nextId, id_estudiante, id_materia, periodo, calificacion]
        );

        res.status(201).json({
            message: `Nota creada exitosamente con ID ${nextId}.`,
            nota: result.rows[0],
        });

    } catch (error) {
        console.error('Error al crear nota:', error);

        // Errores de clave foránea (FK)
        if (error.code === '23503') {
            return res.status(400).json({ 
                message: 'El estudiante o la materia especificados no existen.' 
            });
        }

        res.status(500).json({ 
            message: 'Error interno del servidor al crear nota.' 
        });
    }
};


// Actualizar una nota
const updateNota = async (req, res) => {
    const { id } = req.params;
    const { id_estudiante, id_materia, periodo, calificacion } = req.body;
    try {
        const result = await db.query(
            `UPDATE notas SET 
             id_estudiante = $1, 
             id_materia = $2, 
             periodo = $3, 
             calificacion = $4
             WHERE id_nota = $5 RETURNING *`,
            [id_estudiante, id_materia, periodo, calificacion, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Nota no encontrada para actualizar.' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al actualizar nota:', error);
        res.status(500).json({ message: 'Error interno del servidor al actualizar.' });
    }
};

// Eliminar una nota
const deleteNota = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('DELETE FROM notas WHERE id_nota = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Nota no encontrada para eliminar.' });
        }
        res.status(204).send(); // 204 No Content
    } catch (error) {
        console.error('Error al eliminar nota:', error);
        res.status(500).json({ message: 'Error interno del servidor al eliminar nota.' });
    }
};

module.exports = {
    getNotas,
    getNotaById,
    createNota,
    updateNota,
    deleteNota,
};
