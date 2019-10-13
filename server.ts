import express from 'express';
import { SERVER_PORT } from './global/environment';


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

        this.io= socketIO( this.httpServer );
        
        this.escucharSockets();
    }

    //Valida si existe la instania del server y si no la crea
    public static get instance(){
        return this._intance || ( this._intance = new Server() );
    }

    private escucharSockets(){
        console.log('Escuchando conexiones - sockets');

        this.io.on('connection', cliente =>{
            console.log('Cliente conectado');
        });
    }

//Asi arrancamos el servidor
    start( callback : Function ){

        this.httpServer.listen( this.port, callback() );
    }

}