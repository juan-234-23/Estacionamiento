// No existe un paquete llamado "db" para importar config, asi que lo eliminamos si no es necesario

const configuracionBaseDeDatos = {
    host: 'localhost',
    port: 3001,
    user: 'user',
    password: '',
    database: 'estacionamiento',
};

const configuracionServidor = {
    port: 3001,
};

export { configuracionBaseDeDatos, configuracionServidor };