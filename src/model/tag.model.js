import { Model, Schema, Types } from "mongoose";

const tagSchema = new Schema({
    name:{
        type: String,
        require: true,
        unique: true,
        minLength: 3,
        maxLength: 25
    },
    description:{
        type: String,
        minLength:3,
        maxLength: 100
    },

},{
    versionKey:false,
    timestamps: false
});

export const tagModel=Model("Tag", tagSchema)