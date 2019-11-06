import { Router, Request, Response } from 'express';
import Server from '../classes/server';

import { usuariosConectados } from '../sockets/socket';




const router = Router();

//Se necesita el path, que es donde se encutra en el servidor web
//El /mensajes es el endpoint
router.get('/mensajes', (req:Request, res: Response ) =>{

    


    res.json({
        ok:true,
       mensaje:'Todo esta bien get'
    })
});

//ASi enviamos mensajes a TODOS  , por rest, enviando
//los campos necesarios con su nombre clave : key

router.post('/mensajes', (req:Request, res: Response ) =>{

    const cuerpo= req.body.cuerpo;
    const de = req.body.de;

    const payload={
        
        cuerpo,
        de
    }

    const server= Server.instance;

    server.io.emit('mensaje-nuevo', payload);


    //Keys
    res.json({
        ok:true,
        cuerpo,
        de
        
    })
});

//Para enviar mensaja a usuario en especifico con su ID
router.post('/mensajes/:id', (req:Request, res: Response ) =>{

    const cuerpo= req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

   
    //Asi se crea el objeto que se va a enviar al evento
    const payload={
        de,
        cuerpo
    }

    //Para poder conectar el servicion rest con el servidor de socket
    //Es la misma instancia del servidor node
    const server= Server.instance;

    //server es nuestro servidor socket.io

    //De esta forma mandamos mensajes privados enviando el id por el rest
    server.io.in( id ).emit('mensaje-privado', payload);

    res.json({
        ok:true,
        cuerpo,
        de,
        id
    })
});



//Servicio para obtener los IDs de los usuarios
router.get('/usuarios', (req: Request, res: Response ) =>{

const server= Server.instance;

//ASi para mostrar todos los ids conectados
server.io.clients( (err: any, clientes:String[]) =>{

    if(err){

        return res.json({
            ok: false,
            err
        })
        

    }

    res.json({

        ok: true,
        clientes

    });
    

});


});


//Asi obtenemos los detalles de los clientes, desde rest 
router.get('/usuarios/detalles', (req: Request, res: Response ) =>{

res.json({
    ok:true,
    clientes:usuariosConectados.getLista()
});

});


export default router;