import { Router } from "express";

import { userRouter} from "./user.route.js"
import { tagRouter } from "./tag.route.js";
import {profileRouter} from "./profile.route.js"

export const routes = Router();

routes.use(userRouter);
routes.use(tagRouter);
routes.use(profileRouter);