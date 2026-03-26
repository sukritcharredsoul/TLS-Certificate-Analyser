import { z } from 'zod' ;


const querySchema = z.object({
    hostname : z.string().min(1).regex(/^[a-zA-Z0-9.-]+$/) ,
    port : z.coerce.number().int().min(1).max(65535).default(443)
}) ;


export default querySchema ;

