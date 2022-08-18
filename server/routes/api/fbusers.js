import { Router } from "express";
import {
	users_index_get,
	user_get,
	user_post,
	user_put,
	user_delete,
} from "../../controllers/api/users.js";

const userRouter = Router();

userRouter.get("/secret", users_index_get);

userRouter.get("/:userId", user_get);

userRouter.post("/", user_post);

userRouter.put("/:userId", user_put);

userRouter.delete("/:userId", user_delete);

export default userRouter;
