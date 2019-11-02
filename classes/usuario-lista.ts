import { Usuario } from "./usuario";



export class UsuarioLista{

    private lista: Usuario[]=[];

constructor(){

}

//Agregar un usario
public agregar( usuario: Usuario){
this.lista.push( usuario);

console.log('Lista: ',this.lista);
return usuario;
}

public actualizarUsuario( id:string, nombre:string){

    for(let usuario of this.lista ){
        if( usuario.id === id ){
            usuario.nombre = nombre;
            break;
        }
    }


    console.log('\n=== Actualizando usuaio ===');
    console.log(this.lista);
    console.log('\nNumero de usuarios: '+this.lista.length);

}

public getLista(){
    return this.lista;
}

public getUsuario( id:string ){

    //Asi buscamos todos los usuarios
    return this.lista.find( usuario => usuario.id === id);
}

//Obtener usuarios de una sala en especifico
getUsuariosEnSala( sala: string ){
    return this.lista.filter( usuario => usuario.sala === sala );
}

//para poder sacar a un usuario del socket o de la lista
public borrarUsuario( id: string){
 
    //Asi obtenemos y guardamos el usuario en objeto
const tempUsuario= this.getUsuario(id);
/* Esto toma el usuario que mando pero regresa todo los demas */
this.lista= this.lista.filter( usuario => usuario.id !==  id);

    //Asi imprimos la lista actual
    console.log(this.lista);

return tempUsuario;

}


}