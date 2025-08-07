// Importar Express
const express = require('express');

// Crear la aplicación Express
const app = express();

// Definir el puerto
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON (opcional pero recomendado)
app.use(express.json());

// Endpoint básico - Hola Mundo
app.get('/', (req, res) => {
    res.send('¡Hola Mundo desde Express!');
});

// Endpoint adicional para probar
app.get('/api/saludo', (req, res) => {
    res.json({
        mensaje: 'Hola desde el API',
        timestamp: new Date().toISOString(),
        status: 'success'
    });
});

// Endpoint con parámetros
app.get('/api/usuario/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    res.json({
        mensaje: `¡Hola ${nombre}!`,
        usuario: nombre,
        timestamp: new Date().toISOString()
    });
});

// Middleware para manejar rutas no encontradas
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada',
        mensaje: 'La ruta que buscas no existe'
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
    console.log(`📡 API disponible en http://localhost:${PORT}/api/saludo`);
});

// Manejar cierre graceful del servidor
process.on('SIGINT', () => {
    console.log('\n🛑 Cerrando servidor...');
    process.exit(0);
});
