import express from 'express';
import { SERVER_PORT } from './global/environment';


//Si importamos todos los metdos exportados de la clase
import * as socket from './sockets/socket';


//Instalamos el typsecript de socket
import socketIO from 'socket.io';

//Creamos un intermediario para express y socket io
import http from 'http';



export default class Server {

    private static _intance: Server;

    public app:express.Application;
    public port: number;

    //Integrar socket.io
    public io: socketIO.Server;

    private httpServer : http.Server;

    private constructor(){
        this.app= express();
        this.port= SERVER_PORT;

        this.httpServer = new http.Server( this.app );

        // io Es el servidor de sockets, tiene el conocimiento de las personas
        /* Conentadas*/
        this.io= socketIO( this.httpServer );
        
        this.escucharSockets();
    }

    //Valida si existe la instania del server y si no la crea
    public static get instance(){
        return this._intance || ( this._intance = new Server() );
    }

    //Asi estamos al pendiente de los eventos desde el servidor, que manda
    //el cliente
    private escucharSockets(){
        console.log('Escuchando conexiones - sockets');

        this.io.on('connection', cliente =>{
            console.log('Cliente conectado');


            //Escuchar lo que emita mensjes
            socket.mensaje(cliente, this.io);

            //Desconectar cliente

        socket.desconectar( cliente );

        });



    }

//Asi arrancamos el servidor
    start( callback : Function ){

        this.httpServer.listen( this.port, callback() );
    }

}