import { Router, Request, Response } from 'express';



const router = Router();

//Se necesita el path, que es donde se encutra en el servidor web
//El /mensajes es el endpoint
router.get('/mensajes', (req:Request, res: Response ) =>{

    


    res.json({
        ok:true,
       mensaje:'Todo esta bien get'
    })
});


router.post('/mensajes', (req:Request, res: Response ) =>{

    const cuerpo= req.body.cuerpo;
    const de = req.body.de;

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

    res.json({
        ok:true,
        cuerpo,
        de,
        id
    })
});

export default router;