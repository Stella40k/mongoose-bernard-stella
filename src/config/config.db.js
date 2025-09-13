import mongoose from "mongoose";

export const connectDB=async()=>{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/practicoTLP");
        console.log("conexion exitosa")
    } catch (error){
        console.log("error de conexion", error)
    }
}