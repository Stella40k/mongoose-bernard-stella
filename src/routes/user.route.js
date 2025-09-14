import { Router } from "express";
import {
    createUser,
    getUser,
    getUsers,
    deleteUser,
    updateUser
} from "../controllers/user.controller.js"

export const userRouter = Router();
userRouter.post("/user", createUser);
userRouter.get("/user/:id", getUser);
userRouter.get("/users", getUsers);
userRouter.put("/user/:id", updateUser);
userRouter.delete("/user/:id", deleteUser);