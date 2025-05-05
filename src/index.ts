import express, {Request , Response} from 'express';
require('dotenv').config();
const app = express();

const port : number | string = process.env.PORT || 4000;

// all middleWare
app.use(express.json());

// database connection 
import dbConnect from './database-connect/dbConnect';
dbConnect();

// all user routes
import userRouter from './routes/userRoute';
app.use('/api/v1/user' , userRouter);

app.listen(port , () => {
    console.log(`app listening in ${port} port`)
})