import { Socket } from 'socket.io';
import SocketIO from 'socket.io';


import { UsuarioLista } from '../classes/usuario-lista';
import { Usuario } from '../classes/usuario';

//Asi para la unica estancia de mis usuarios conectados
export const usuariosConectados = new UsuarioLista();

//
export const conectarCLiente= ( cliente: Socket)=>{

    //ASi le agregamos el id del socket al usuario 
    const usuario= new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
};

//De esta forma sabemos si el cliente se desconecto
export const desconectar = ( cliente: Socket) =>{

   
//Asi estamos pendientes si el cliente se desconecta

cliente.on('disconnect', () =>{
    console.log('Cliente desconectado');
    //De esta forma borramos al usuario de la lista y su conexion
    usuariosConectados.borrarUsuario(cliente.id);

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

//Asi creamos los canales o socket
export const usuarioConfig=( cliente: Socket, io:SocketIO.Server) =>{

    //Hacer una interface para recbir el payload de un tipo
    //Donde el primer parametro es el nombre del evento
cliente.on('configurar-usuario', ( payload:{ nombre:string }, callback:Function) =>{

    //Asi agregamos datos al usuario        
    usuariosConectados.actualizarUsuario(cliente.id, payload.nombre);
   

    //Con el callback Podemos obtener una respuesta directa
    callback( {
        ok:true,
        mensaje: `Usuario ${ payload.nombre }, configurado`
    });

    

   
});
}