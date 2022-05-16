import mongoose from "mongoose";
import async from "async";
import Post from "./models/post.js";
import User from "./models/user.js";
import Comment from "./models/comment.js";
import "dotenv/config.js";

mongoose.connect(process.env.MONGO, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

export const elonmuskID = "626f0e7610400b7982748786";
export const a_id = "626f0e7610400b7982748787";
export const b_id = "626f0e7610400b7982748788";

export const elonPostID1 = "626f0e7710400b7982748790";
export const elonPostID2 = "626f0e7710400b7982748791";

export const a_comment_id = "62817209b96ad77c3f084866";
export const b_comment_id = "62817209b96ad77c3f084868";

const posts = [];
const users = [];
const comments = [];

function postCreate(
	author,
	title,
	timestamp,
	post,
	published,
	comments,
	_id,
	cb
) {
	const postObj = {
		author,
		title,
		timestamp,
		post,
		published,
		comments,
		_id,
	};
	console.log(postObj);
	const newPost = new Post(postObj);
	newPost.save((err) => {
		if (err) {
			cb(err, null);
			return;
		}
		posts.push(newPost);
		cb(null, newPost);
	});
}

function userCreate(username, password, _id, cb) {
	const userObj = {
		username,
		password,
		_id,
	};
	const user = new User(userObj);
	user.save((err) => {
		if (err) {
			cb(err, null);
			return;
		}
		users.push(user);
		cb(null, user);
	});
}

function commentCreate(author, text, timestamp, _id, cb) {
	const commentObj = {
		author,
		text,
		timestamp,
		_id,
	};
	console.log(commentObj);
	const newComment = new Comment(commentObj);
	newComment.save((err) => {
		if (err) {
			cb(err, null);
			return;
		}
		comments.push(newComment);
		cb(null, newComment);
	});
}

// Function calls
function createUsers(cb) {
	async.series(
		[
			// username, password, _id
			function (callback) {
				userCreate(
					"elonmusk@tesla.com",
					"teslamotors",
					elonmuskID,
					callback
				);
			},
			function (callback) {
				userCreate("aaaaaa@aaaaaa.com", "aaaaaa", a_id, callback);
			},
			function (callback) {
				userCreate("bbbbbb@bbbbbb.com", "bbbbbb", b_id, callback);
			},
		],
		cb
	);
}

function createCommentsAndPosts(cb) {
	async.series(
		[
			// author, comment, timestamp,
			function (callback) {
				commentCreate(
					users[1],
					"Wowwwwwwwww",
					"2000-01-02",
					a_comment_id,
					callback
				);
			},
			function (callback) {
				commentCreate(
					users[2],
					"GreatJob",
					"2000-01-03",
					b_comment_id,
					callback
				);
			}, // author, title, timestamp, post, published, comments, _id
			function (callback) {
				postCreate(
					users[0],
					"test title 1",
					"2000-01-01",
					"Lorem ipsum, Lorem ipsum, Lorem ipsum",
					true,
					comments,
					elonPostID1,
					callback
				);
			},
			function (callback) {
				postCreate(
					users[0],
					"test title 2",
					"2020-01-01",
					"Hello world",
					true,
					[],
					elonPostID2,
					callback
				);
			},
		],
		cb
	);
}

export function populate() {
	async.series([createUsers, createCommentsAndPosts], function (err) {
		if (err) {
			throw new Error("FINAL ERR: " + err);
		} else {
			console.log(`Success in uploading data to DB`);
		}
	});
}

async.series([createUsers, createCommentsAndPosts], function (err) {
	if (err) {
		throw new Error("FINAL ERR: " + err);
	} else {
		console.log(`Success in uploading data to DB`);
	}
});
