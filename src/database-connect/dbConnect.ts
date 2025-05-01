import mongoose from "mongoose";

const database_url : string | undefined = process.env.DATABASE_URL;

let dbConnect = async () : Promise<void> => {
   try{
          // connect database
    if(typeof(database_url) === 'string'){
        let dbConnect = await mongoose.connect(database_url);

        if(dbConnect){
            console.log("database connected successfully");
        }
    } else{
        console.log("database url is undefined")
    }

   }catch(err: unknown){
        console.log("problem in connecting database");
        if (err instanceof Error) {
            console.log(err.message);
          } else {
            console.log("Unknown error", err);
          }
   }
}

export default dbConnect;