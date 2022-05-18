import postRouter from "../routes/api/posts.js";
import request from "supertest";
import express from "express";
import { beforeAll, afterAll, test } from "@jest/globals";
import { initializeMongoServer, stopServer } from "../mongoConfigTesting.js";

import { getTokenFromUser } from "./testHelper.js";
import {
	expectedAllPosts,
	postByID,
	postFromPOST,
	allUserPostsAfterPOST,
} from "./postTestResults.js";
import { populate } from "./populateDBTesting.js";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", postRouter);

let token;

beforeAll(async () => {
	initializeMongoServer();
	await populate();
	token = await getTokenFromUser();
});

afterAll(async () => {
	stopServer();
});

test("posts/GET all route", (done) => {
	request(app)
		.get("/")
		.expect("Content-Type", /json/)
		.expect(expectedAllPosts)
		.expect(200, done);
});

test("posts/GET/:postId route", (done) => {
	const postID = "626f0e7710400b7982748790";
	request(app)
		.get(`/` + postID)
		.set("Authorization", "Bearer " + token)
		.expect("Content-Type", /json/)
		.expect(postByID)
		.expect(200, done);
});

test("posts/POST route", (done) => {
	const setID = "626f0e7710400b7982748888";
	request(app)
		.post("/")
		.set("Authorization", "Bearer " + token)
		.type("form")
		.send({
			title: "test title",
			post: "test post",
			published: "true",
			timestamp: postFromPOST.timestamp,
			setID,
		})
		.then(() => {
			request(app)
				.get(`/${setID}`)
				.set("Authorization", "Bearer " + token)
				.expect("Content-Type", /json/)
				.expect(postFromPOST)
				.expect(200, done);
		});
});

test("posts/GET/:userId/all route", (done) => {
	const userID = "626f0e7610400b7982748786";
	request(app)
		.get(`/${userID}/all`)
		.set("Authorization", "Bearer " + token)
		.expect("Content-Type", /json/)
		.expect(allUserPostsAfterPOST)
		.expect(200, done);
});

test("posts/GET/:userId/all route", (done) => {
	const userID = "626f0e7610400b7982748786";
	request(app)
		.get(`/${userID}/all`)
		.set("Authorization", "Bearer " + token)
		.expect("Content-Type", /json/)
		.expect(allUserPostsAfterPOST)
		.expect(200, done);
});

test("posts/PUT/:postId route", (done) => {
	const originalPost = {
		_id: "626f0e7710400b7982748888",
		author: {
			_id: "626f0e7610400b7982748786",
			username: "elonmusk@tesla.com",
			password: "teslamotors",
			__v: 0,
		},
		title: "test title",
		timestamp: "2022-05-17T19:37:15.351Z",
		post: "test post",
		published: true,
		comments: [],
		__v: 0,
	};

	const newPost = {
		_id: "626f0e7710400b7982748888",
		author: {
			_id: "626f0e7610400b7982748786",
			username: "elonmusk@tesla.com",
			password: "teslamotors",
			__v: 0,
		},
		title: "this is not a title",
		timestamp: "2022-05-17T19:37:15.351Z",
		post: "this is not a post",
		published: false,
		comments: [],
		__v: 0,
	};

	request(app)
		.put(`/${originalPost._id}`)
		.set("Authorization", "Bearer " + token)
		.type("form")
		.send({
			title: "this is not a title",
			post: "this is not a post",
			published: "false",
		})
		.then(() => {
			request(app)
				.get(`/${originalPost._id}`)
				.set("Authorization", "Bearer " + token)
				.expect("Content-Type", /json/)
				.expect(newPost)
				.expect(200, done);
		});
});

test("posts/PUT/:postId route", (done) => {
	const originalPost = {
		_id: "626f0e7710400b7982748888",
		author: {
			_id: "626f0e7610400b7982748786",
			username: "elonmusk@tesla.com",
			password: "teslamotors",
			__v: 0,
		},
		title: "test title",
		timestamp: "2022-05-17T19:37:15.351Z",
		post: "test post",
		published: true,
		comments: [],
		__v: 0,
	};

	const newPost = {
		_id: "626f0e7710400b7982748888",
		author: {
			_id: "626f0e7610400b7982748786",
			username: "elonmusk@tesla.com",
			password: "teslamotors",
			__v: 0,
		},
		title: "this is not a title",
		timestamp: "2022-05-17T19:37:15.351Z",
		post: "this is not a post",
		published: false,
		comments: [],
		__v: 0,
	};

	request(app)
		.put(`/${originalPost._id}`)
		.set("Authorization", "Bearer " + token)
		.type("form")
		.send({
			title: "this is not a title",
			post: "this is not a post",
			published: "false",
		})
		.then(() => {
			request(app)
				.get(`/${originalPost._id}`)
				.set("Authorization", "Bearer " + token)
				.expect("Content-Type", /json/)
				.expect(newPost)
				.expect(200, done);
		});
});

test("posts/DELETE/:postId route", (done) => {
	const post = {
		_id: "626f0e7710400b7982748888",
		author: {
			_id: "626f0e7610400b7982748786",
			username: "elonmusk@tesla.com",
			password: "teslamotors",
			__v: 0,
		},
		title: "this is not a title",
		timestamp: "2022-05-17T19:37:15.351Z",
		post: "this is not a post",
		published: false,
		comments: [],
		__v: 0,
	};

	request(app)
		.delete(`/${post._id}`)
		.set("Authorization", "Bearer " + token)
		.expect("Content-Type", /json/)
		.expect({ msg: "Post successfully deleted" })
		.expect(200)
		.then(() => {
			request(app)
				.get(`/${post._id}`)
				.set("Authorization", "Bearer " + token)
				.expect("Content-Type", /json/)
				.expect({ error: "Cannot find post" })
				.expect(400, done);
		});
});

// postRouter.put(
// 	"/:postId",
// 	passport.authenticate("jwt", { session: false }),
// 	post_put
// );

// // empty comments
// test("posts/GET/:postId/comments route", (done) => {
// 	const postID = postFromPOST._id;
// 	request(app)
// 		.get(`/${postID}/comments`)
// 		.set("Authorization", "Bearer " + token)
// 		.expect("Content-Type", /json/)
// 		.expect([])
// 		.expect(200, done);
// });

// // comments available
// test("posts/GET/:postId/comments route", (done) => {
// 	const postID = postByID._id;
// 	request(app)
// 		.get(`/${postID}/comments`)
// 		.set("Authorization", "Bearer " + token)
// 		.expect("Content-Type", /json/)
// 		.expect(postByID.comments)
// 		.expect(200, done);
// });
