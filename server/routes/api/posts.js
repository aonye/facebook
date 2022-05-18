import { Router } from "express";
import passport from "../../passport.js";
import {
	posts_index_get,
	posts_user_index_get,
	post_get,
	post_post,
	post_put,
	post_delete,
} from "../../controllers/api/posts.js";
import commentRouter from "./comments.js";

const postRouter = Router();

postRouter.use(
	"/:postId/comments",
	passport.authenticate("jwt", { session: false }),
	commentRouter
);

// Get all posts (homepage, not authed)
postRouter.get("/", posts_index_get);

postRouter.get(
	"/:userId/all",
	passport.authenticate("jwt", { session: false }),
	posts_user_index_get
);

postRouter.get(
	"/:postId",
	passport.authenticate("jwt", { session: false }),
	post_get
);

postRouter.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	post_post
);

postRouter.put(
	"/:postId",
	passport.authenticate("jwt", { session: false }),
	post_put
);

postRouter.delete(
	"/:postId",
	passport.authenticate("jwt", { session: false }),
	post_delete
);

export default postRouter;
