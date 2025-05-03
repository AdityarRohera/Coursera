import mongoose , {Schema , Document} from "mongoose";
const {ObjectId} = Schema;

interface purchaseType extends Document {
    courseId : string,
    userId : string
}

const purchaseSchema : Schema<purchaseType> = new Schema({
    courseId : {
        type : String,
        required : true
    },
    userId : {
        type : String,
        required : true
    }
} , {
    timestamps : true
})

export const purchaseModel = mongoose.model('purchases' , purchaseSchema);