import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: "estacionamiento"
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexion exitosa a la base de datos.');
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM usuarios WHERE usuario = ? AND contrasenia = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error al ejecutar la consulta:', err);
            res.status(500).json({ success: false, message: 'Error en el servidor' });
            return;
        }

        if (results.length > 0) {
            // Devuelve el usuario (incluye username)
            res.json({ success: true, user: results[0] });
        } else {
            res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
        }
    });
});

// Ruta para registrar un nuevo usuario

app.post('/api/Form', (req, res) => {
    console.log("Datos recibidos:", req.body);   
    const { Automovil, Tipo,  Color, Marca, Placa, Precio} = req.body;
    db.query(
        'INSERT INTO auto (Automovil, Tipo,  Color, Marca, Placa, Precio) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [Automovil, Tipo,  Color, Marca, Placa, Precio],
        (err2, result=any) => {
            if (err2) {
                console.error('Error al registrar vehiculo:', err2);
                return res.json({ success: false, message: 'Error al registrar vehiculo.' });
            }
            res.json({ success: true });
        }
    );
});
app.post('/api/registrotarifa', (req, res) => {
    const { tipo_de_vehiculo, tarifa_por_hora, descuento } = req.body;
    db.query(
        'INSERT INTO tarifa (tipo_de_vehiculo, tarifa_por_hora, descuento) VALUES (?, ?, ?)',
        [tipo_de_vehiculo, tarifa_por_hora, descuento],
        (err, result) => {
            if (err) {
                console.error('Error al registrar tarifa:', err);
                return res.json({ success: false, message: 'Error al registrar tarifa.' });
            }
            res.json({ success: true });
        }
    );
});


app.post('/api/registro_lugar_estacionamiento', (req, res) => {
    const { selectedSpot, estado, zona } = req.body;
    db.query(
        'UPDATE lugar_estacionamiento SET estado = ?, zona = ? WHERE id_lugar = ?',
        [estado, zona, selectedSpot],
        (err, result) => {
            if (err) {
                console.error('Error al actualizar lugar de estacionamiento:', err);
                return res.json({ success: false, message: 'Error al actualizar lugar de estacionamiento.' });
            }
            // Si no se actualizó ninguna fila, significa que no existe, entonces haz un INSERT
            if (result.affectedRows === 0) {
                db.query(
                    'INSERT INTO lugar_estacionamiento (id_lugar, estado, zona) VALUES (?, ?, ?)',
                    [selectedSpot, estado, zona],
                    (err2, result2) => {
                        if (err2) {
                            console.error('Error al insertar lugar de estacionamiento:', err2);
                            return res.json({ success: false, message: 'Error al insertar lugar de estacionamiento.' });
                        }
                        res.json({ success: true });
                    }
                );
            } else {
                res.json({ success: true });
            }
        }
    );
});


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});