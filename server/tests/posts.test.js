/* eslint-disable no-undef */
import postRouter from "../routes/api/posts.js";
import request from "supertest";
import express from "express";
import { initializeMongoServer, stopServer } from "../mongoConfigTesting.js";
import { populateUser, getTokenFromUser } from "./populateUser.js";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", postRouter);

let token;

beforeAll(async () => {
	await initializeMongoServer();
	await populateUser();
	token = await getTokenFromUser();
	await request(app)
		.post("/")
		.auth(token, { type: "bearer" })
		.send("title=deleting this")
		.send("post=deleting this post")
		.send("published=false")
		.expect(200);
});

const getAllPostsJSON = [
	{
		_id: "626f0e7710400b7982748790",
		author: {
			_id: "626f0e7610400b7982748786",
			username: "elonmusk@tesla.com",
			password: "tesla",
			__v: 0,
		},
		title: "test title3",
		timestamp: "2000-01-01T00:00:00.000Z",
		post: "Lorem ipsum",
		published: true,
		comments: [
			{
				_id: "626f0e7710400b798274878c",
				author: {
					_id: "626f0e7610400b7982748787",
					username: "b@b.com",
					password: "b",
					__v: 0,
				},
				text: "Wowwwwwwwww",
				timestamp: "2000-01-02T00:00:00.000Z",
				__v: 0,
			},
			{
				_id: "626f0e7710400b798274878e",
				author: {
					_id: "626f0e7610400b7982748787",
					username: "b@b.com",
					password: "b",
					__v: 0,
				},
				text: "GreatJob",
				timestamp: "2000-01-03T00:00:00.000Z",
				__v: 0,
			},
		],
		__v: 0,
	},
	{
		_id: "626f0e7710400b7982748792",
		author: {
			_id: "626f0e7610400b7982748786",
			username: "elonmusk@tesla.com",
			password: "tesla",
			__v: 0,
		},
		title: "test title 2",
		timestamp: "2020-01-01T00:00:00.000Z",
		post: "Hello world",
		published: true,
		comments: [],
		__v: 0,
	},
];

const getPostByID = [
	{
		_id: "626f0e7710400b7982748792",
		author: {
			_id: "626f0e7610400b7982748786",
			username: "elonmusk@tesla.com",
			password: "tesla",
			__v: 0,
		},
		title: "test title 2",
		timestamp: "2020-01-01T00:00:00.000Z",
		post: "Hello world",
		published: true,
		comments: [],
		__v: 0,
	},
];

test("posts/GET route works", (done) => {
	request(app)
		.get("/")
		.expect("Content-Type", /json/)
		.expect(getAllPostsJSON)
		.expect(200, done);
});

// stopServer();

// test("posts/GET/:postId route works", (done) => {
// 	const postID = "626f0e7710400b7982748792";
// 	request(app)
// 		.get(`/${postID}`)
// 		.set("Authorization", "bearer " + token)
// 		.expect("Content-Type", /json/)
// 		.expect(getPostByID)
// 		.expect(200, done);
// });

// stopServer();

// test("posts/POST route works", (done) => {
// 	request(app)
// 		.post("/test")
// 		.type("form")
// 		.send({ item: "hey" })
// 		.then(() => {
// 			request(app)
// 				.get("/test")
// 				.expect({ array: ["hey"] }, done);
// 		});
// });
