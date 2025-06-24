import colors from 'colors';
import server from "./server";


const port = 3000;
server.listen(port, () => {
    console.log( colors.cyan.bold (`REST API en el puerto: ${port}`));
    console.log( colors.cyan.bold (`http://localhost:${port}`));
});

