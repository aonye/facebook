/* eslint-disable camelcase */
import { Router } from "express";
import passport from "../../passport.js";
import { index_get } from "../../controllers/api/index.js";
import postRouter from "./posts.js";
import userRouter from "./users.js";
import loginRouter from "./login.js";

const APIRouter = Router();

APIRouter.use(
	"/users",
	passport.authenticate("jwt", { session: false }),
	userRouter
);

// Route level auth
APIRouter.use("/posts", postRouter);
APIRouter.use("/login", loginRouter);

APIRouter.get("/", index_get);

export default APIRouter;
