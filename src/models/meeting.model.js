import {schema} from "mongoose";

const meetingSchema = new schema({
    user_id: {
        type: String},
        meetingCode: {type: String , required : true},
        date: {type: Date , default : Date.now, required : true},

    }
)

const Meeting = mongoose.model("Meeting", meetingSchema);
export {Meeting};