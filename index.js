// index.js
const express = require('express');
const app = express();
require('dotenv').config(); // Cargar variables de entorno

const PORT = process.env.PORT || 3000;

// =================================================================
// 🚨 CAMBIO CLAVE 1: Importar la librería CORS
const cors = require('cors');
// =================================================================


// MIDDLEWARES
// =================================================================
// 🚨 CAMBIO CLAVE 2: Aplicar el middleware CORS
// Permite peticiones desde CUALQUIER origen ('*'), necesario para que Flutter Web funcione desde localhost.
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], // Importante para futuros tokens de seguridad
}));
// =================================================================

app.use(express.json()); // Para manejar peticiones JSON

// IMPORTAR RUTAS
const estudiantesRoutes = require('./src/routes/estudiantes.routes');
const acudientesRoutes = require('./src/routes/acudientes.routes');
const cursoRoutes = require('./src/routes/cursos.routes');
const docentesRoutes = require('./src/routes/docentes.routes');
const gradosRoutes = require('./src/routes/grados.routes');
const materiasRoutes = require('./src/routes/materias.routes');
const notasRoutes = require('./src/routes/notas.routes');
const contraseñaRoutes = require('./src/routes/contraseña.routes');


// USAR RUTAS
app.use('/api/estudiantes', estudiantesRoutes);
app.use('/api/acudientes', acudientesRoutes);
app.use('/api/cursos', cursoRoutes);
app.use('/api/docentes', docentesRoutes);
app.use('/api/grados', gradosRoutes);
app.use('/api/materias', materiasRoutes);
app.use('/api/notas', notasRoutes);
app.use('/api/contraseña', contraseñaRoutes);


// Ruta principal con diseño visual e información de rutas
app.get('/', (req, res) => {
  const html = `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API del Colegio 🎓</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

      body {
        margin: 0;
        font-family: 'Poppins', sans-serif;
        height: 100vh;
        background: linear-gradient(135deg, #0072ff, #00c6ff);
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-x: hidden;
        padding-bottom: 50px;
      }

      header {
        text-align: center;
        margin-top: 60px;
        animation: fadeInDown 1.5s ease;
      }

      h1 {
        font-size: 3em;
        margin-bottom: 0.2em;
        text-shadow: 2px 2px 10px rgba(0,0,0,0.4);
      }

      p {
        font-size: 1.2em;
        color: #e0f7fa;
      }

      table {
        margin-top: 30px;
        border-collapse: collapse;
        width: 80%;
        max-width: 900px;
        background: rgba(255, 255, 255, 0.15);
        border-radius: 15px;
        overflow: hidden;
        animation: fadeIn 2s ease;
      }

      th, td {
        padding: 15px;
        text-align: left;
      }

      th {
        background: rgba(0, 0, 0, 0.3);
        font-size: 1.1em;
      }

      tr:nth-child(even) {
        background: rgba(255, 255, 255, 0.05);
      }

      a {
        color: #fff;
        text-decoration: underline;
        transition: 0.3s;
      }

      a:hover {
        color: #ffeb3b;
      }

      footer {
        margin-top: 40px;
        font-size: 0.9em;
        color: rgba(255,255,255,0.8);
        animation: fadeInUp 2s ease;
      }

      /* Animaciones */
      @keyframes fadeInDown {
        from { opacity: 0; transform: translateY(-30px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    </style>
  </head>
  <body>
    <header>
      <h1>🚀 API del Colegio</h1>
      <p>Servidor Express en funcionamiento y modularizado 🎨</p>
    </header>

    <table>
      <tr>
        <th>Ruta</th>
        <th>Método</th>
        <th>Descripción</th>
      </tr>

        <tr><td colspan="3"><hr style="border: 0.5px solid rgba(255,255,255,0.3);"></td></tr>
    
        <tr>
          <td><a href="/api/acudientes">/api/acudientes</a></td>
          <td>GET</td>
          <td>Obtiene la lista completa de acudientes</td>
        </tr>
        <tr>
          <td>/api/acudientes/:id</td>
          <td>GET</td>
          <td>Obtiene los datos de un acudiente por su ID</td>
        </tr>
        <tr>
          <td>/api/acudientes</td>
          <td>POST</td>
          <td>Registra un nuevo acudiente en el sistema</td>
        </tr>
        <tr>
          <td>/api/acudientes/:id</td>
          <td>PUT</td>
          <td>Actualiza la información de un acudiente existente</td>
        </tr>
        <tr>
          <td>/api/acudientes/:id</td>
          <td>DELETE</td>
          <td>Elimina un acudiente del sistema por su ID</td>
        </tr>


        <tr><td colspan="3"><hr style="border: 0.5px solid rgba(255,255,255,0.3);"></td></tr>

        <tr>
          <td><a href="/api/cursos">/api/cursos</a></td>
          <td>GET</td>
          <td>Obtiene la lista completa de cursos disponibles</td>
        </tr>
        <tr>
          <td>/api/cursos/:id</td>
          <td>GET</td>
          <td>Obtiene la información detallada de un curso por su ID</td>
        </tr>
        <tr>
          <td>/api/cursos</td>
          <td>POST</td>
          <td>Crea un nuevo curso en el sistema</td>
        </tr>
        <tr>
          <td>/api/cursos/:id</td>
          <td>PUT</td>
          <td>Actualiza la información de un curso existente</td>
        </tr>
        <tr>
          <td>/api/cursos/:id</td>
          <td>DELETE</td>
          <td>Elimina un curso del sistema por su ID</td>
        </tr>

        <tr><td colspan="3"><hr style="border: 0.5px solid rgba(255,255,255,0.3);"></td></tr>

        <tr>
          <td><a href="/api/docentes">/api/docentes</a></td>
          <td>GET</td>
          <td>Obtiene la lista completa de docentes registrados</td>
        </tr>
        <tr>
          <td>/api/docentes/:id</td>
          <td>GET</td>
          <td>Obtiene la información de un docente por su ID</td>
        </tr>
        <tr>
          <td>/api/docentes</td>
          <td>POST</td>
          <td>Registra un nuevo docente en el sistema</td>
        </tr>
        <tr>
          <td>/api/docentes/:id</td>
          <td>PUT</td>
          <td>Actualiza la información de un docente existente</td>
        </tr>
        <tr>
          <td>/api/docentes/:id</td>
          <td>DELETE</td>
          <td>Elimina un docente del sistema por su ID</td>
        </tr>

          <tr><td colspan="3"><hr style="border: 0.5px solid rgba(255,255,255,0.3);"></td></tr>


        <tr>
          <td><a href="/api/estudiantes">/api/estudiantes</a></td>
          <td>GET</td>
          <td>Obtiene la lista completa de estudiantes</td>
        </tr>
        <tr>
          <td>/api/estudiantes/:id</td>
          <td>GET</td>
          <td>Obtiene los datos de un estudiante por su ID</td>
        </tr>
        <tr>
          <td>/api/estudiantes</td>
          <td>POST</td>
          <td>Crea un nuevo estudiante</td>
        </tr>
        <tr>
          <td>/api/estudiantes/:id</td>
          <td>PUT</td>
          <td>Actualiza los datos de un estudiante existente</td>
        </tr>
        <tr>
          <td>/api/estudiantes/:id</td>
          <td>DELETE</td>
          <td>Elimina un estudiante por su ID</td>
        </tr>


        <tr><td colspan="3"><hr style="border: 0.5px solid rgba(255,255,255,0.3);"></td></tr>

        <tr>
          <td><a href="/api/grados">/api/grados</a></td>
          <td>GET</td>
          <td>Obtiene la lista completa de grados académicos</td>
        </tr>
        <tr>
          <td>/api/grados/:id</td>
          <td>GET</td>
          <td>Obtiene la información detallada de un grado por su ID</td>
        </tr>
        <tr>
          <td>/api/grados</td>
          <td>POST</td>
          <td>Registra un nuevo grado en el sistema</td>
        </tr>
        <tr>
          <td>/api/grados/:id</td>
          <td>PUT</td>
          <td>Actualiza la información de un grado existente</td>
        </tr>
        <tr>
          <td>/api/grados/:id</td>
          <td>DELETE</td>
          <td>Elimina un grado del sistema por su ID</td>
        </tr>

        <tr><td colspan="3"><hr style="border: 0.5px solid rgba(255,255,255,0.3);"></td></tr>

        <tr>
          <td><a href="/api/materias">/api/materias</a></td>
          <td>GET</td>
          <td>Obtiene la lista completa de materias disponibles</td>
        </tr>
        <tr>
          <td>/api/materias/:id</td>
          <td>GET</td>
          <td>Obtiene la información detallada de una materia por su ID</td>
        </tr>
        <tr>
          <td>/api/materias</td>
          <td>POST</td>
          <td>Registra una nueva materia en el sistema</td>
        </tr>
        <tr>
          <td>/api/materias/:id</td>
          <td>PUT</td>
          <td>Actualiza la información de una materia existente</td>
        </tr>
        <tr>
          <td>/api/materias/:id</td>
          <td>DELETE</td>
          <td>Elimina una materia del sistema por su ID</td>
        </tr>


        <tr><td colspan="3"><hr style="border: 0.5px solid rgba(255,255,255,0.3);"></td></tr>

        <tr>
          <td><a href="/api/notas">/api/notas</a></td>
          <td>GET</td>
          <td>Obtiene todas las notas registradas</td>
        </tr>
        <tr>
          <td>/api/notas/:id</td>
          <td>GET</td>
          <td>Obtiene una nota específica por ID</td>
        </tr>
        <tr>
          <td>/api/notas</td>
          <td>POST</td>
          <td>Crea una nueva nota</td>
        </tr>
        <tr>
          <td>/api/notas/:id</td>
          <td>PUT</td>
          <td>Actualiza una nota existente</td>
        </tr>
        <tr>
          <td>/api/notas/:id</td>
          <td>DELETE</td>
          <td>Elimina una nota por ID</td>
        </tr>
    </table>

    <footer>
      Desarrollado por <strong>Juan Camilo</strong> © ${new Date().getFullYear()}
    </footer>
  </body>
  </html>
  `;
  res.send(html);
});



// INICIO DEL SERVIDOR
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
    // Opcional: Ejecuta una prueba de conexión a la BD aquí si quieres
    require('./db/db'); 
});