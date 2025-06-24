import express from 'express';
import colors from 'colors';
import router from './router';
import db from './config/db';

async function connectDB() {
    try {
        await db.authenticate();
        db.sync()
        console.log(colors.green.bold( 'Conexión exitosa a la base de datos'));
    } catch (error) {
        console.log( colors.red.bold( 'Error al conectarse con la BD'));
        //console.log(error);
    }
}
connectDB()
const server = express();
server.use(express.json()) 
server.use('/api/products', router)
export default server;

