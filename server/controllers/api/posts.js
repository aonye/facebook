/* eslint-disable camelcase */
import { body, validationResult } from 'express-validator';
import User from '../../models/user.js';
import Post from '../../models/post.js';
import Comment from '../../models/comment.js';
// import comment from '../../models/comment.js';

// TEST VARS, MODELS, COMMENTS
const authorSample = new User({
	username: 'test username',
	password: 'test password',
});

const authorSample2 = new User({
	_id: '6212a780919c075099493009',
	username: 'elonmusk@tesla.com',
	password: 'tesla',
});

const commentAuthor = new User({
	username: 'friend1',
	password: 'friendpw',
});

const commentSample = new Comment({
	author: commentAuthor,
	text: 'lopre ipsum',
	timestamp: new Date(),
});

export const posts_index_get = async (req, res) => {
	const posts = await Post.find()
		.populate('author')
		.populate({
			path: 'comments',
			populate: {
				path: 'author',
				model: 'User',
			},
		})
		.populate();
	return posts === null
		? res.status(400).json({ error: 'Cannot find posts' })
		: posts.length === 0
		? res.status(404).json({ error: 'No posts found' })
		: res.json(posts);
};

export const posts_user_index_get = async (req, res) => {
	// Find posts given user ID
	const post = await Post.find({
		author: {
			_id: req.params.userId,
		},
	})
		.populate('author')
		.populate({
			path: 'comments',
			populate: {
				path: 'author',
				model: 'User',
			},
		});
	return post === null
		? res.status(400).json({ error: 'Cannot find posts' })
		: post.length === 0
		? res.status(404).json({ error: 'No posts found' })
		: res.json(post);
};

export const post_get = async (req, res) => {
	const post = await Post.findById(req.params.postId);
	return post
		? res.json(post)
		: res.status(404).json({ error: 'Post not found' });
};

export const post_post = [
	body('title')
		.trim()
		.isLength({ min: 1, max: 200 })
		.withMessage('Comment is too long')
		.escape(),
	body('post')
		.trim()
		.isLength({ min: 1, max: 20 })
		.withMessage('Author is too long')
		.escape(),
	body('published')
		.trim()
		.isLength({ min: 1, max: 20 })
		.withMessage('Author is too long')
		.escape(),

	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json(errors.array());
		}
		// get user from cookies here, comments should be empty for new post
		const post = new Post({
			author: authorSample2,
			title: req.body.title,
			timestamp: new Date(),
			post: req.body.post,
			published: req.body.published === 'true',
			comments: [],
		});

		post.save((err) => {
			if (err) {
				return res.status(400).json({ error: 'Error saving post' });
			}
			return res.status(200).json({ msg: 'Post successfully saved' });
		});
	},
];

export const post_put = [
	body('title')
		.trim()
		.isLength({ min: 1, max: 100 })
		.withMessage('Title is too long')
		.escape(),
	body('post')
		.trim()
		.isLength({ min: 1, max: 2000 })
		.withMessage('Post text is too long')
		.escape(),
	body('published')
		.trim()
		.isLength({ min: 4, max: 5 })
		.withMessage('Invalid publish state')
		.escape(),

	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json(errors.array());
		}

		const post = await Post.findById(req.params.postId);
		if (post) {
			post.title = req.body.title ? req.body.title : post.title;
			post.post = req.body.post ? req.body.post : post.post;
			post.published = req.body.published === 'true';
			// check if logged in user (cookies) matches the post author
			post.save((err) => {
				if (err) {
					return res
						.status(400)
						.json({ error: 'Error updating post' });
				}
				return res
					.status(200)
					.json({ msg: 'Post successfully updated' });
			});
		} else {
			return res.status(404).json({ error: 'Post not found' });
		}
	},
];

export const post_delete = async (req, res, next) => {
	const post = await Post.findById(req.params.postId).populate('comments');
	if (post) {
		while (post.comments.length > 0) {
			const comment = post.comments.pop();
			Comment.findByIdAndDelete(comment.id, (err, res) => {
				if (err) {
					return res
						.status(404)
						.json({ error: 'Error removing post comment' });
				}
			});
		}
		return post.remove({ id: req.params.postId })
			? res.status(200).json({ msg: 'Post successfully deleted' })
			: res.status(404).json({ error: 'Error removing post' });
	}
	return res.status(404).json({ error: 'Post not found' });
};
