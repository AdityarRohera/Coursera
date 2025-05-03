import mongoose , {Schema , Document} from "mongoose";
const {ObjectId} = Schema;

interface courseType extends Document {
    courseUrl : string,
    courseHeading : string,
    courseSubHeading : string,
    coursePrice : number,
    courseOriginalPrice : number,
    courseDiscount : number,
    adminId : string,
    createdAt?: Date;
    updatedAt?: Date;
}

const courseSchema : Schema<courseType> = new Schema({
    courseUrl : {
        type : String,
        data : Buffer,
        required : true
    },
    courseHeading : {
        type : String,
        required : true,
        trim : true
    },
    courseSubHeading : {
        type : String,
        required : true,
        trim : true
    },
    coursePrice : {
        type : Number,
        required : true,
        min : 0
    },
    courseOriginalPrice : {
        type : Number,
        required : true,
    },
    courseDiscount : {
        type : Number,
        required : true,
        min :0,
        max :100
    },
    adminId : {
        type : String,
        required : true
    }
} , {
    timestamps: true
})


export const courseModel = mongoose.model('courses' , courseSchema);
