import { Router } from "express";
import {
    createArticle,
    getArticles,
    getArticle,
    updateArticle,
    deleteArticle
} from "../controllers/article.controller.js";

export const articleRouter = Router();
articleRouter.post("/article", createArticle);
articleRouter.get("/article/:id", getArticle);
articleRouter.get("/article", getArticles);
articleRouter.put("/article/:id", updateArticle);
articleRouter.delete("/article/:id", deleteArticle);
articleRouter.post("/articles/add-tag", addTagToArticle);
