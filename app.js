import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./src/config/config.db.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.listen(PORT, async()=>{
    await connectDB();
    console.log(`servidor escuchado en el puerto ${PORT}`)
})