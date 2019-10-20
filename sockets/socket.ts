import { Socket } from 'socket.io';



//De esta forma sabemos si el cliente se desconecto
export const desconectar = ( cliente: Socket) =>{

cliente.on('disconnect', () =>{
    console.log('Cliente desconectado');
});

}

//Escuhar los mensajes
export const mensaje=( cliente: Socket, io:SocketIO.Server) =>{

    //Hacer una interface para recbir el payload de un tipo
    //Donde el primer parametro es el nombre del evento
cliente.on('mensaje', ( payload:{ de:string, cuerpo:string }) =>{

    console.log('Mensaje recibido: ', payload);

    //De esta forma emitimos a los cleintes conectados lo que tenga
    //la propiedad mensaje-nuevo
    io.emit('mensaje-nuevo', payload );
});
}