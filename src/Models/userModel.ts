// Here is User and Admin schema
import mongoose , {Schema , Document} from "mongoose";
// const {Schema} = mongoose; ?? this will not work because on destucturing mongoose you get only value not type of schema.
// const {ObjectId} = Schema;

interface UserType extends Document {
    name : {
        firstName : string;
        lastName : string;
    },
    email : string;
    password : string;
    isAdmin : boolean;

}

const userSchema : Schema<UserType> = new Schema({
    name : {
        firstName: {
            type : String,
            required : true,
            trim : true
        },
        lastName: {
            type : String,
            required : true,
            trim : true
        }
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true
    },
    password : {
        type : String,
        required : true,
        match : /@/
    },
    isAdmin : {
        type : Boolean,
        default : false
    }
})

export const userModel = mongoose.model('users' , userSchema);
