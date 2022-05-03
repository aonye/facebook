import { Router } from "express";
import {
	post_comments_index_get,
	comment_get,
	comment_post,
	comment_put,
	comment_delete,
} from "../../controllers/api/comments.js";

const commentRouter = Router({ mergeParams: true });

commentRouter.get("/", post_comments_index_get);
// get all comments for a specific post

commentRouter.get("/:commentId", comment_get);
// get specific comment

commentRouter.post("/", comment_post);

commentRouter.put("/:commentId", comment_put);

commentRouter.delete("/:commentId", comment_delete);

export default commentRouter;
