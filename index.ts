import Server from "./server";
import router from "./routes/router";



import cors from 'cors';


import bodyParser from 'body-parser';

const server =  Server.instance;

//bodyParser SIEMPRE ANTES DE LAS RUTAS
//El body parser sirve para convertir los datos retornados en json
server.app.use( bodyParser.urlencoded({ extended: true}));
server.app.use( bodyParser.json() );

server.app.use( cors({ origin: true, credentials: true } ));

//De esta forma se lellama el servicio rest
//Rutas de servicios
server.app.use('/', router);

server.start( () =>{
    console.log(`Servidor corriendo en el puerto ${server.port}`);
});