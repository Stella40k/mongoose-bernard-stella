import { Router } from "express";
import {
    createTag,
    getTag,
    getTags,
    updateTag,
    deleteTag
} from "../controllers/tag.controller.js"

export const tagRouter = Router();
tagRouter.post("/tag", createTag);
tagRouter.get("/tag/:id", getTag);
tagRouter.get("/tags", getTags);
tagRouter.put("/tag/:id", updateTag);
tagRouter.delete("/tag/:id", deleteTag);