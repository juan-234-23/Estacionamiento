import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
dotenv.config();

const db = new Sequelize(process.env.DB_URL!, {
    models: [__dirname + "/../models/**/*.ts"],
    dialect: 'postgres', // explícitamente indicar el dialecto
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // necesario para conexiones en servicios como Render
        },
    },
});

export default db; 

