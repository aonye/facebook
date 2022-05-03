import { body, validationResult } from 'express-validator';
import Comment from '../../models/comment.js';
import Post from '../../models/post.js';
import User from '../../models/user.js';

// Test
const mockAuthor = new User({
	username: 'test comment -- username',
	password: 'test comment -- password',
});

const mockAuthor2 = new User({
	_id: '6212a780919c075099493009',
	username: 'elonmusk@tesla.com',
	password: 'tesla',
});

export const post_comments_index_get = async (req, res) => {
	const post = await Post.findById(req.params.postId).populate('comments');
	return post
		? res.json(post.comments)
		: res.status(404).json({ error: 'Post not found' });
};

export const comment_get = async (req, res) => {
	const comment = await Comment.findById(req.params.commentId);
	return comment
		? res.json(comment)
		: res.status(404).json({ error: 'Comment not found' });
};

export const comment_post = [
	body('text')
		.trim()
		.isLength({ min: 1, max: 200 })
		.withMessage('Comment is too long')
		.escape(),
	body('userId')
		.trim()
		.isLength({ min: 23, max: 24 })
		.withMessage('UserID error')
		.escape(),

	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json(errors.array());
		}

		const author = await User.findOne({ id: req.params.userId });

		if (!author) {
			return res.status(404).json({ error: 'User error' });
		}

		const comment = new Comment({
			author,
			text: req.body.text,
			timestamp: new Date(),
		});

		const post = await Post.findById(req.params.postId).populate(
			'comments',
		);
		if (post) {
			const commentSaveResult = await comment.save();
			if (commentSaveResult) {
				post.comments.push(comment);
				return post.save()
					? res
							.status(200)
							.json({ msg: 'Success. Comment saved to post' })
					: res
							.status(400)
							.json({ error: 'Error saving comment to post' });
			}
			return res.status(400).json({ error: 'Error saving comment' });
		}
		return res.status(404).json({ error: 'Error finding post' });
	},
];

export const comment_put = [
	// test this
	body('text')
		.trim()
		.isLength({ min: 1, max: 200 })
		.withMessage('Comment is too long')
		.escape(),

	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json(errors.array());
		}

		// validation check - author id of comment matches the user id

		const comment = await Comment.findById(req.params.commentId);
		if (comment) {
			comment.text = req.body.text;
			return comment.save()
				? res.status(200).json({ msg: 'Success. Comment updated' })
				: res.status(400).json({ error: 'Error updating comment' });
		}
		return res.status(404).json({ error: 'Comment not found' });
	},
];

export const comment_delete = async (req, res) => {
	const comment = await Comment.findById(req.params.commentId);
	const post = await Post.findById(req.params.postId).populate('comments');
	if (comment && post) {
		const result = await comment.remove({ id: comment.id });
		const index = post.comments.map((item) => item.id).indexOf(comment.id);
		post.comments = post.comments
			.slice(0, index)
			.concat(post.comments.slice(index + 1));
		return post.save() && result
			? res.status(200).json({ msg: 'Comment deleted. Post updated' })
			: res.status(400).json({ error: 'Error saving post' });
	}
	return res.status(404).json({ error: 'Comment, Post not found' });
};
