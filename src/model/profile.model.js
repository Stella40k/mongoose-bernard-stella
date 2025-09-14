import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const profileSchema = new Schema({
    user:{
        //este campo guardara un id de otro documento
        type: Schema.Types.ObjectId,
        //aca le decis donde o cual es el objectid q le corresponde y es de la coleccion User
        ref: "User",
        required: true,
        unique: true
    },
    firstName:{
        type: String,
        require: true,
        maxLength: 30,
        minLength: 2
    },
    lastName:{
        type: String,
        maxLength:30,
        minLength: 2
    },
    biography:{
        type: String,
        maxLength:150
    }
},{
    versionKey: false,
    timestamps: false
})

export const Profile = mongoose.model("Profile", profileSchema)