// import mongoose from "mongoose";
// import { MongoMemoryServer } from "mongodb-memory-server";
// import { initializeMongoServer } from "./mongoConfigTesting.js";
import async from "async";
import Post from "./models/post.js";
import User from "./models/user.js";
import Comment from "./models/comment.js";
import "dotenv/config.js";

//change
// const mongoServer = await MongoMemoryServer.create();
// const mongoUri = mongoServer.getUri();

// mongoose.connection.on("error", (e) => {
// 	if (e.message.code === "ETIMEDOUT") {
// 		console.log(e);
// 		mongoose.connect(mongoUri);
// 	}
// 	console.log(e);
// });

// mongoose.connection.once("open", () => {
// 	console.log(`MongoDB successfully connected to ${mongoUri}`);
// });

const posts = [];
const users = [];
const comments = [];

function postCreate(author, title, timestamp, post, published, comments, cb) {
	const postObj = {
		author,
		title,
		timestamp,
		post,
		published,
		comments,
	};
	const newPost = new Post(postObj);
	newPost.save((err) => {
		if (err) {
			cb(err, null);
			return;
		}
		// console.log(`New Post: + ${newPost}`);
		posts.push(newPost);
		cb(null, newPost);
	});
}

function userCreate(username, password, cb) {
	const userObj = {
		username,
		password,
	};
	const user = new User(userObj);
	user.save((err) => {
		if (err) {
			cb(err, null);
			return;
		}
		// console.log("New User: " + user);
		users.push(user);
		cb(null, user);
	});
}

function commentCreate(author, text, timestamp, cb) {
	const commentObj = {
		author,
		text,
		timestamp,
	};
	const newComment = new Comment(commentObj);
	newComment.save((err) => {
		if (err) {
			cb(err, null);
			return;
		}
		// console.log("New Comment: " + newComment);
		comments.push(newComment);
		cb(null, newComment);
	});
}

// Function calls
function createUsers(cb) {
	// first_name, last_name, membership_status, message, username, password, cb
	async.parallel(
		[
			// username, password
			function (callback) {
				userCreate("elonmusk@tesla.com", "tesla", callback);
			},
			function (callback) {
				userCreate("b@b.com", "b", callback);
			},
		],
		cb
	);
}

function createCommentsAndPosts(cb) {
	// author, comment, timestamp,
	async.series(
		[
			// username, password
			function (callback) {
				commentCreate(users[0], "Wowwwwwwwww", "2000-01-02", callback);
			},
			function (callback) {
				commentCreate(users[0], "GreatJob", "2000-01-03", callback);
			}, // author, title, timestamp, post, published, comments
			function (callback) {
				postCreate(
					users[1],
					"test title 1",
					"2000-01-01",
					"Lorem ipsum, Lorem ipsum, Lorem ipsum",
					true,
					comments,
					callback
				);
			},
			function (callback) {
				postCreate(
					users[1],
					"test title 2",
					"2020-01-01",
					"Hello world",
					true,
					[],
					callback
				);
			},
		],
		cb
	);
}

// async calls
async function populate() {
	async.series(
		[createUsers, createCommentsAndPosts],
		// Optional callback
		function (err) {
			if (err) {
				// console.log("FINAL ERR: " + err);
			} else {
				// console.log(`Success`);
			}
			// All done, disconnect from database
			// mongoose.connection.close();
		}
	);
}

export default populate;
