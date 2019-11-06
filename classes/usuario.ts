export class Usuario{

    //Socket genera un id unico cada coneccion con el servidor 
public id: string;
public nombre: string;
public sala: string;

constructor( id:string ){
    this.id=id;
    //Al usuario sin configurar se le asigna el sin nombre
    this.nombre='sin-nombre';
    this.sala='sin-sala';

}


}