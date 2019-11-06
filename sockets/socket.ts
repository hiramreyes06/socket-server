import { Socket } from 'socket.io';
import SocketIO from 'socket.io';


import { UsuarioLista } from '../classes/usuario-lista';
import { Usuario } from '../classes/usuario';

//Asi para la unica estancia de mis usuarios conectados
export const usuariosConectados = new UsuarioLista();

//
export const conectarCLiente= ( cliente: Socket, io:SocketIO.Server)=>{

    //ASi le agregamos el id del socket al usuario 
    const usuario= new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);

    
};

//De esta forma sabemos si el cliente se desconecto
export const desconectar = ( cliente: Socket, io: SocketIO.Server) =>{

   
//Asi estamos pendientes si el cliente se desconecta

cliente.on('disconnect', () =>{
    console.log('Cliente desconectado');
    //De esta forma borramos al usuario de la lista y su conexion
    usuariosConectados.borrarUsuario(cliente.id);

    io.emit('usuarios-activos', usuariosConectados.getLista());
});

}

//Escuhar los mensajes
export const mensaje=( cliente: Socket, io:SocketIO.Server) =>{

    //Hacer una interface para recbir el payload de un tipo
    //Donde el primer parametro es el nombre del evento
cliente.on('mensaje', ( payload:{ de:string, cuerpo:string }) =>{

    console.log('Mensaje enviado: ', payload);

    //De esta forma emitimos a los cleintes conectados lo que tenga
    //la propiedad mensaje-nuevo
    io.emit('mensaje-nuevo', payload );
});
}

//De esta forma creamos los canales o socket
//Asi configuramos el nombre del usuario y le asignamos un id socket
export const usuarioConfig=( cliente: Socket, io:SocketIO.Server) =>{

    //Hacer una interface para recbir el payload de un tipo
    //Donde el primer parametro es el nombre del evento
cliente.on('configurar-usuario', ( payload:{ nombre:string }, callback:Function) =>{

    //Asi agregamos datos al usuario        
    usuariosConectados.actualizarUsuario(cliente.id, payload.nombre);

    //Al configurar un usario, emite usuarios activos
    io.emit('usuarios-activos', usuariosConectados.getLista());
   

    //Con el callback Podemos obtener una respuesta directa
    callback( {
        ok:true,
        mensaje: `Usuario ${ payload.nombre }, configurado`
    });

    

   
});
}

//Asi escuchamos el evento emitido desde angular
export const obtenerUsuarios=( cliente: Socket, io:SocketIO.Server) =>{

    //Asi estamos escuchando el evento usuarios-activos desde el servidor
cliente.on('obtener-usuarios', () =>{

    //De esta forma el evento es emitido para todos los usarios
   // io.emit('usuarios-activos', usuariosConectados.getLista() );


    //Asi emitimos un evento para el usuario propio en su app
io.to( cliente.id ).emit('usuarios-activos', usuariosConectados.getLista() );

} );

}