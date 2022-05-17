import postRouter from "../routes/api/posts.js";
import request from "supertest";
import express from "express";
import { beforeAll, afterAll, test } from "@jest/globals";
import { initializeMongoServer, stopServer } from "../mongoConfigTesting.js";
import { getTokenFromUser } from "./populateUser.js";
import { populate } from "./populateDBTesting.js";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", postRouter);

let token;

beforeAll(async () => {
	initializeMongoServer();
	await populate();
	token = await getTokenFromUser();
	console.log(token);
});

afterAll(async () => {
	stopServer();
});

const expectedAllPosts = [
	{
		_id: "626f0e7710400b7982748790",
		author: {
			_id: "626f0e7610400b7982748786",
			username: "elonmusk@tesla.com",
			password: "teslamotors",
			__v: 0,
		},
		title: "test title 1",
		timestamp: "2000-01-01T00:00:00.000Z",
		post: "Lorem ipsum, Lorem ipsum, Lorem ipsum",
		published: true,
		comments: [
			{
				_id: "62817209b96ad77c3f084866",
				author: {
					_id: "626f0e7610400b7982748787",
					username: "aaaaaa@aaaaaa.com",
					password: "aaaaaa",
					__v: 0,
				},
				text: "Wowwwwwwwww",
				timestamp: "2000-01-02T00:00:00.000Z",
				__v: 0,
			},
			{
				_id: "62817209b96ad77c3f084868",
				author: {
					_id: "626f0e7610400b7982748788",
					username: "bbbbbb@bbbbbb.com",
					password: "bbbbbb",
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
		_id: "626f0e7710400b7982748791",
		author: {
			_id: "626f0e7610400b7982748786",
			username: "elonmusk@tesla.com",
			password: "teslamotors",
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

test("posts/GET all route", (done) => {
	request(app)
		.get("/")
		.expect("Content-Type", /json/)
		.expect(expectedAllPosts)
		.expect(200, done);
});

const getPostByID = {
	_id: "626f0e7710400b7982748790",
	author: {
		_id: "626f0e7610400b7982748786",
		username: "elonmusk@tesla.com",
		password: "teslamotors",
		__v: 0,
	},
	title: "test title 1",
	timestamp: "2000-01-01T00:00:00.000Z",
	post: "Lorem ipsum, Lorem ipsum, Lorem ipsum",
	published: true,
	comments: [
		{
			_id: "62817209b96ad77c3f084866",
			author: {
				_id: "626f0e7610400b7982748787",
				username: "aaaaaa@aaaaaa.com",
				password: "aaaaaa",
				__v: 0,
			},
			text: "Wowwwwwwwww",
			timestamp: "2000-01-02T00:00:00.000Z",
			__v: 0,
		},
		{
			_id: "62817209b96ad77c3f084868",
			author: {
				_id: "626f0e7610400b7982748788",
				username: "bbbbbb@bbbbbb.com",
				password: "bbbbbb",
				__v: 0,
			},
			text: "GreatJob",
			timestamp: "2000-01-03T00:00:00.000Z",
			__v: 0,
		},
	],
	__v: 0,
};

test("posts/GET/:postId route", (done) => {
	const postID = "626f0e7710400b7982748790";
	request(app)
		.get(`/` + postID)
		.set("Authorization", "Bearer " + token)
		.expect("Content-Type", /json/)
		.expect(getPostByID)
		.expect(200, done);
});

const postToGet = {
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
			timestamp: postToGet.timestamp,
			setID,
		})
		.then(() => {
			request(app)
				.get(`/${setID}`)
				.set("Authorization", "Bearer " + token)
				.expect("Content-Type", /json/)
				.expect(postToGet)
				.expect(200, done);
		});
});

test("posts/GET/:userId/all route", (done) => {
	const setID = "626f0e7710400b7982748888";
	request(app)
		.get("/")
		.set("Authorization", "Bearer " + token)
		.type("form")
		.send({
			title: "test title",
			post: "test post",
			published: "true",
			timestamp: postToGet.timestamp,
			setID,
		})
		.then(() => {
			request(app)
				.get(`/${setID}`)
				.set("Authorization", "Bearer " + token)
				.expect("Content-Type", /json/)
				.expect(postToGet)
				.expect(200, done);
		});
});
