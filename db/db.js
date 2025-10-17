// db/db.js
const { Pool } = require('pg');

// ⚠️ NOTA IMPORTANTE PARA EL DESPLIEGUE EN RENDER:
// Si usas 'dotenv' en local, asegúrate de que esté configurado
// para producción, pero en Render, la variable DATABASE_URL 
// será inyectada automáticamente y este require no es necesario.
// require('dotenv').config(); 

// 1. Obtiene la cadena de conexión
const connectionString = process.env.DATABASE_URL;

// 2. Configuración de la conexión a la BD
const pool = new Pool({
    // Usa la cadena de conexión que contiene host, user, password, etc.
    connectionString: connectionString,
    
    // 3. ¡Configuración SSL Obligatoria para Render!
    // Render requiere SSL para todas las conexiones externas.
    ssl: {
        // Esto permite la conexión incluso si el certificado no es verificado 
        // por una CA conocida, lo cual es común en el plan gratuito de Render.
        rejectUnauthorized: false 
    }
});

// 4. Prueba la conexión (opcional, pero muy útil para debug)
pool.connect((err, client, release) => {
    if (err) {
        // Muestra el error si la conexión falla (vital para depurar el despliegue)
        return console.error('❌ Error adquiriendo cliente de BD. ¿DATABASE_URL es correcta?', err.stack);
    }
    console.log('✅ Conectado exitosamente a PostgreSQL!');
    release(); // Libera el cliente inmediatamente después de la prueba
});

// 5. Exporta el Pool para que otros módulos puedan hacer consultas
module.exports = {
    /**
     * Función para ejecutar consultas SQL.
     * @param {string} text - El texto de la consulta SQL.
     * @param {Array<any>} params - Los parámetros para la consulta.
     * @returns {Promise<any>} El resultado de la consulta.
     */
    query: (text, params) => pool.query(text, params),
    // También puedes exportar el pool directamente si lo necesitas
    pool: pool,
};