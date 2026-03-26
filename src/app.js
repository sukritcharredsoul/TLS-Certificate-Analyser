import express from 'express' ;
import router from './routes/check.js';

const app = express() ;
app.use(express.json()) ;

app.use("/api",router) ;

app.get("/",(req,res) => {
    res.send("Server is up & running.") ;
})


export default app ;