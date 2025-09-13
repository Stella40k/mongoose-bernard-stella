import { Model, Schema, Types } from "mongoose";

const tagSchema = new Schema({
    name:{
        type: string,
        require: true,
        unique: true,
        minLength: 3,
        maxLength: 25
    },
    descriptio:{
        type: String,
        minLength:3,
        maxLength: 100
    },

},{
    versionKey:false

});

export const tagModel=Model("Tag", tagSchema)