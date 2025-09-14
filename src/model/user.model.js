import { Schema} from "mongoose";
import mongoose from "mongoose";

const userSchema= new Schema({
    username:{
        type: String,
        required: true, 
        unique: true,
        minlength: 3,
        maxlength: 25
    }, 
    email:{
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'direccion de correo invalido']
    },
    password:{
        type: String,
        required: true
    },
    //aca iran los agregafos despues
},{
    versionKey:false,
    //le indica a mongoose q no le incluya el campo __v
    //__v es un controlador de versiones de documentos, no sirve en las respuestas 
    timestamps: true
})

export const userModel = mongoose.model("User", userSchema)