import { Router } from 'express' ;
import querySchema from '../validator/validator.js';
import { certChecker } from '../services/certChecker.js';
import { stringify } from 'flatted';


const router = Router() ;


router.post("/check", async (req,res) => {
    const parsed = querySchema.safeParse(req.body) ;

    if(!parsed.success){
        return res.status(400).json({message : "Error in the input field. Please rewrite your query."}) ;
    }

    const {hostname , port} = parsed.data ;
    
    const result = await certChecker(hostname,port) ;

    console.log(result) ;

    res.status(200).send(stringify(result)) ;


})


export default router ;