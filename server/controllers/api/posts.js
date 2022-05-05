import { body, validationResult } from "express-validator";
import User from "../../models/user.js";
import Post from "../../models/post.js";
import Comment from "../../models/comment.js";
import { getUserIDFromJWT } from "./UserHelper.js";

export const posts_index_get = async (req, res) => {
	const posts = await Post.find()
		.populate("author")
		.populate({
			path: "comments",
			populate: {
				path: "author",
				model: "User",
			},
		})
		.populate();
	return posts === null
		? res.status(400).json({ error: "Cannot find posts" })
		: posts.length === 0
		? res.status(404).json({ error: "No posts found" })
		: res.json(posts);
};

export const posts_user_index_get = async (req, res) => {
	// Find posts given user ID
	const post = await Post.find({
		author: {
			_id: req.params.userId,
		},
	})
		.populate("author")
		.populate({
			path: "comments",
			populate: {
				path: "author",
				model: "User",
			},
		});
	return post === null
		? res.status(400).json({ error: "Cannot find posts" })
		: post.length === 0
		? res.status(404).json({ error: "No posts found" })
		: res.json(post);
};

export const post_get = async (req, res) => {
	const post = await Post.findById(req.params.postId);
	return post
		? res.json(post)
		: res.status(404).json({ error: "Post not found" });
};

export const post_post = [
	body("title")
		.trim()
		.isLength({ min: 1, max: 30 })
		.withMessage("Title is invalid. min 1, max 30.")
		.escape(),
	body("post")
		.trim()
		.isLength({ min: 1, max: 10000 })
		.withMessage("Post is invalid. Min 1, max 10000.")
		.escape(),
	body("published")
		.trim()
		.isLength({ min: 4, max: 5 })
		.withMessage("Published status is invalid.")
		.escape(),

	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json(errors.array());
		}

		const userID = getUserIDFromJWT(req.headers.authorization);

		if (!userID) {
			return res.status(400).json({ msg: "No userID found" });
		}

		const user = await User.findById(userID);

		if (!user) {
			return res.status(400).json({ msg: "No user found" });
		}

		// New post
		const post = new Post({
			author: user,
			title: req.body.title,
			timestamp: new Date(),
			post: req.body.post,
			published: req.body.published === "true",
			comments: [],
		});

		post.save((err) => {
			if (err) {
				return res.status(400).json({ error: "Error saving post" });
			}
			return res.status(200).json({ msg: "Post successfully saved" });
		});
	},
];

export const post_put = [
	body("title")
		.trim()
		.isLength({ min: 1, max: 30 })
		.withMessage("Title is invalid. min 1, max 30.")
		.escape(),
	body("post")
		.trim()
		.isLength({ min: 1, max: 2000 })
		.withMessage("Post is invalid. Min 1, max 10000.")
		.escape(),
	body("published")
		.trim()
		.isLength({ min: 4, max: 5 })
		.withMessage("Published status is invalid.")
		.escape(),

	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json(errors.array());
		}

		const userID = getUserIDFromJWT(req.headers.authorization);

		if (!userID) {
			return res.status(400).json({ msg: "No userID found" });
		}

		const post = await Post.findById(req.params.postId).populate({
			path: "author",
		});
		if (post) {
			if (userID !== post.author._id.toString()) {
				return res.status(400).json({ msg: "Post match error" });
			}
			post.title = req.body.title ? req.body.title : post.title;
			post.post = req.body.post ? req.body.post : post.post;
			post.published = req.body.published === "true";
			post.save((err) => {
				if (err) {
					return res
						.status(400)
						.json({ error: "Error updating post" });
				}
				return res
					.status(200)
					.json({ msg: "Post successfully updated" });
			});
		} else {
			return res.status(404).json({ error: "Post not found" });
		}
	},
];

export const post_delete = async (req, res, next) => {
	const post = await Post.findById(req.params.postId).populate("comments");
	if (post) {
		while (post.comments.length > 0) {
			const comment = post.comments.pop();
			Comment.findByIdAndDelete(comment.id, (err, res) => {
				if (err) {
					return res
						.status(404)
						.json({ error: "Error removing post comment" });
				}
			});
		}
		return post.remove({ id: req.params.postId })
			? res.status(200).json({ msg: "Post successfully deleted" })
			: res.status(404).json({ error: "Error removing post" });
	}
	return res.status(404).json({ error: "Post not found" });
};
