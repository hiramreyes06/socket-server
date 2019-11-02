import { Router, Request, Response } from 'express';
import Server from '../classes/server';




const router = Router();

//Se necesita el path, que es donde se encutra en el servidor web
//El /mensajes es el endpoint
router.get('/mensajes', (req:Request, res: Response ) =>{

    


    res.json({
        ok:true,
       mensaje:'Todo esta bien get'
    })
});

//ASi enviamos mensajes a todos  , por rest, enviando
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

//Otra ruta diferente, para probar le agreamos algo al url
router.post('/mensajes/:id?', (req:Request, res: Response ) =>{

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

    //De esta forma mandamos mensajes privados enviando el id 
    //server.io.in(id).emit('mensaje-privado', payload);

    //De esta forma le enviamos a TODOS los usuarios con id incorrecto
    server.io.emit('mensaje-privado', payload);

    res.json({
        ok:true,
        cuerpo,
        de,
        id
    })
});

export default router;