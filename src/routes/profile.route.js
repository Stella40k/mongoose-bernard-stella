import { Router } from "express";
import {
    getProfile,
    getProfiles,
    createProfile,
    updateProfile,
    deleteProfile
} from "../controllers/profile.controller.js";

export const profileRouter = Router();

profileRouter.post("/profile", createProfile);
profileRouter.get("/profile/:id", getProfile);
profileRouter.get("/profiles", getProfiles);
profileRouter.put("/profile/:id", updateProfile);
profileRouter.delete("/profile/:id", deleteProfile);