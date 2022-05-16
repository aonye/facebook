import async from "async";

import Post from "../models/post.js";
import User from "../models/user.js";
import Comment from "../models/comment.js";

export const elonmuskID = "626f0e7610400b7982748786";
export const a_id = "626f0e7610400b7982748787";
export const b_id = "626f0e7610400b7982748788";

export const elonPostID1 = "626f0e7710400b7982748790";
export const elonPostID2 = "626f0e7710400b7982748791";

export const a_comment_id = "62817209b96ad77c3f084866";
export const b_comment_id = "62817209b96ad77c3f084868";

const users = [];
const comments = [];

async function postCreate(
	author,
	title,
	timestamp,
	post,
	published,
	comments,
	_id
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
	const newPost = new Post(postObj);
	await newPost.save();
}

async function userCreate(username, password, _id) {
	const userObj = {
		username,
		password,
		_id,
	};
	const user = new User(userObj);
	await user.save();
	users.push(user);
}

async function commentCreate(author, text, timestamp, _id) {
	const commentObj = {
		author,
		text,
		timestamp,
		_id,
	};
	const newComment = new Comment(commentObj);
	await newComment.save();
	comments.push(newComment);
}

export async function populate() {
	await userCreate("elonmusk@tesla.com", "teslamotors", elonmuskID);
	await userCreate("aaaaaa@aaaaaa.com", "aaaaaa", a_id);
	await userCreate("bbbbbb@bbbbbb.com", "bbbbbb", b_id);
	await commentCreate(users[1], "Wowwwwwwwww", "2000-01-02", a_comment_id);
	await commentCreate(users[2], "GreatJob", "2000-01-03", b_comment_id);
	await postCreate(
		users[0],
		"test title 1",
		"2000-01-01",
		"Lorem ipsum, Lorem ipsum, Lorem ipsum",
		true,
		comments,
		elonPostID1
	);
	await postCreate(
		users[0],
		"test title 2",
		"2020-01-01",
		"Hello world",
		true,
		[],
		elonPostID2
	);
}
