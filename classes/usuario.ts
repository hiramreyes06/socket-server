export class Usuario{

    //Socket genera un id unico cada coneccion con el servidor 
public id: string;
public nombre: string;
public sala: string;

constructor( id:string ){
    this.id=id;
    this.nombre='Sin nombre';
    this.sala='Sin sala';

}


}