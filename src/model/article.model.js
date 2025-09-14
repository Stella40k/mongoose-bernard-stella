import { Model, Schema} from "mongoose";
import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true, 
        minlength: 3,
        maxlength: 20
    },
    content:{
        type: String,
        required: true,
        minlength: 10
    },
    status:{
        type: String,
        enum: ["publicado", "archivado"],
        default: "publicado"
    },
    //relacion con el user
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    tags:[{
        type: Schema.Types.ObjectId,
        ref: "tag"
    }]
},{
    versionKey: false,
    timestamps: true
})

export const articleModel = mongoose.model("Article", articleSchema);