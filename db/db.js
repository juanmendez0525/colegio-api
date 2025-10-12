// db/db.js
const { Pool } = require('pg');
require('dotenv').config();

// Configuración de la conexión a la BD
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Prueba la conexión (opcional, pero útil)
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error adquiriendo cliente de BD', err.stack);
    }
    console.log('Conectado exitosamente a PostgreSQL!');
    release(); // Libera el cliente
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};