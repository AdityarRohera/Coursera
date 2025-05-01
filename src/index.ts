import express, {Request , Response} from 'express';
require('dotenv').config();
const app = express();

const port : number | string = process.env.PORT || 4000;

// database connection 
import dbConnect from './database-connect/dbConnect';
dbConnect();

app.get('/' , (req : Request , res : Response) => {
    res.send("Hello World");
})

app.listen(port , () => {
    console.log(`app listening in ${port} port`)
})