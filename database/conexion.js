const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const URL_ATLAS = process.env.URL_ATLAS;

const conexion = mongoose.connect(URL_ATLAS);

conexion.then(() => {
    console.log('Conexión con Mongo Atlas exitosa');
}).catch(() => {
    console.log('No se pudo conectar con Mongo Atlas');
});

module.exports = {
    conexion,
    URL_ATLAS
}