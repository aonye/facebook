import commentRouter from "../routes/api/comments.js";
import express from "express";
import request from "supertest";
import { beforeAll, describe, test } from "@jest/globals";

import { getTokenFromUser } from "./testHelper.js";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/:postId/comments", commentRouter);

export const commentTests = () =>
	describe("comments route", () => {
		let token;
		beforeAll(async () => {
			token = await getTokenFromUser();
		});
		test("comments/GET w/ postId nonempty route", (done) => {
			const posts = [
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
			request(app)
				.get(`/${posts[0]._id}/comments`)
				.set("Authorization", "Bearer " + token)
				.expect("Content-Type", /json/)
				.expect(posts[0].comments)
				.expect(200, done);
		});

		test("comments/GET w/ postId empty route", (done) => {
			const posts = [
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
			request(app)
				.get(`/${posts[1]._id}/comments`)
				.set("Authorization", "Bearer " + token)
				.expect("Content-Type", /json/)
				.expect([])
				.expect(200, done);
		});

		test("comments/POST/:postId route", (done) => {
			const posts = [
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
					],
					__v: 0,
				},
			];
			// request(app)
			// 	.get(`/` + post._id)
			// 	.set("Authorization", "Bearer " + token)
			// 	.expect("Content-Type", /json/)
			// 	.expect(post)
			// 	.expect(200, done);
		});

		// test("posts/POST route", (done) => {
		// 	const post = {
		// 		_id: "626f0e7710400b7982748888",
		// 		author: {
		// 			_id: "626f0e7610400b7982748786",
		// 			username: "elonmusk@tesla.com",
		// 			password: "teslamotors",
		// 			__v: 0,
		// 		},
		// 		title: "test title",
		// 		timestamp: "2022-05-17T19:37:15.351Z",
		// 		post: "test post",
		// 		published: true,
		// 		comments: [],
		// 		__v: 0,
		// 	};
		// 	request(app)
		// 		.post("/")
		// 		.set("Authorization", "Bearer " + token)
		// 		.type("form")
		// 		.send({
		// 			title: "test title",
		// 			post: "test post",
		// 			published: "true",
		// 			timestamp: post.timestamp,
		// 			setID: post._id,
		// 		})
		// 		.then(() => {
		// 			request(app)
		// 				.get(`/${post._id}`)
		// 				.set("Authorization", "Bearer " + token)
		// 				.expect("Content-Type", /json/)
		// 				.expect(post)
		// 				.expect(200, done);
		// 		});
		// });

		// test("posts/GET/:userId/all route", (done) => {
		// 	const userID = "626f0e7610400b7982748786";
		// 	const posts = [
		// 		{
		// 			_id: "626f0e7710400b7982748790",
		// 			author: {
		// 				_id: "626f0e7610400b7982748786",
		// 				username: "elonmusk@tesla.com",
		// 				password: "teslamotors",
		// 				__v: 0,
		// 			},
		// 			title: "test title 1",
		// 			timestamp: "2000-01-01T00:00:00.000Z",
		// 			post: "Lorem ipsum, Lorem ipsum, Lorem ipsum",
		// 			published: true,
		// 			comments: [
		// 				{
		// 					_id: "62817209b96ad77c3f084866",
		// 					author: {
		// 						_id: "626f0e7610400b7982748787",
		// 						username: "aaaaaa@aaaaaa.com",
		// 						password: "aaaaaa",
		// 						__v: 0,
		// 					},
		// 					text: "Wowwwwwwwww",
		// 					timestamp: "2000-01-02T00:00:00.000Z",
		// 					__v: 0,
		// 				},
		// 				{
		// 					_id: "62817209b96ad77c3f084868",
		// 					author: {
		// 						_id: "626f0e7610400b7982748788",
		// 						username: "bbbbbb@bbbbbb.com",
		// 						password: "bbbbbb",
		// 						__v: 0,
		// 					},
		// 					text: "GreatJob",
		// 					timestamp: "2000-01-03T00:00:00.000Z",
		// 					__v: 0,
		// 				},
		// 			],
		// 			__v: 0,
		// 		},
		// 		{
		// 			_id: "626f0e7710400b7982748791",
		// 			author: {
		// 				_id: "626f0e7610400b7982748786",
		// 				username: "elonmusk@tesla.com",
		// 				password: "teslamotors",
		// 				__v: 0,
		// 			},
		// 			title: "test title 2",
		// 			timestamp: "2020-01-01T00:00:00.000Z",
		// 			post: "Hello world",
		// 			published: true,
		// 			comments: [],
		// 			__v: 0,
		// 		},
		// 		{
		// 			_id: "626f0e7710400b7982748888",
		// 			author: {
		// 				_id: "626f0e7610400b7982748786",
		// 				username: "elonmusk@tesla.com",
		// 				password: "teslamotors",
		// 				__v: 0,
		// 			},
		// 			title: "test title",
		// 			timestamp: "2022-05-17T19:37:15.351Z",
		// 			post: "test post",
		// 			published: true,
		// 			comments: [],
		// 			__v: 0,
		// 		},
		// 	];
		// 	request(app)
		// 		.get(`/${userID}/all`)
		// 		.set("Authorization", "Bearer " + token)
		// 		.expect("Content-Type", /json/)
		// 		.expect(posts)
		// 		.expect(200, done);
		// });

		// test("posts/PUT/:postId route", (done) => {
		// 	const originalPost = {
		// 		_id: "626f0e7710400b7982748888",
		// 		author: {
		// 			_id: "626f0e7610400b7982748786",
		// 			username: "elonmusk@tesla.com",
		// 			password: "teslamotors",
		// 			__v: 0,
		// 		},
		// 		title: "test title",
		// 		timestamp: "2022-05-17T19:37:15.351Z",
		// 		post: "test post",
		// 		published: true,
		// 		comments: [],
		// 		__v: 0,
		// 	};

		// 	const newPost = {
		// 		_id: "626f0e7710400b7982748888",
		// 		author: {
		// 			_id: "626f0e7610400b7982748786",
		// 			username: "elonmusk@tesla.com",
		// 			password: "teslamotors",
		// 			__v: 0,
		// 		},
		// 		title: "this is not a title",
		// 		timestamp: "2022-05-17T19:37:15.351Z",
		// 		post: "this is not a post",
		// 		published: false,
		// 		comments: [],
		// 		__v: 0,
		// 	};

		// 	request(app)
		// 		.put(`/${originalPost._id}`)
		// 		.set("Authorization", "Bearer " + token)
		// 		.type("form")
		// 		.send({
		// 			title: "this is not a title",
		// 			post: "this is not a post",
		// 			published: "false",
		// 		})
		// 		.then(() => {
		// 			request(app)
		// 				.get(`/${originalPost._id}`)
		// 				.set("Authorization", "Bearer " + token)
		// 				.expect("Content-Type", /json/)
		// 				.expect(newPost)
		// 				.expect(200, done);
		// 		});
		// });

		// test("posts/DELETE/:postId route", (done) => {
		// 	const post = {
		// 		_id: "626f0e7710400b7982748888",
		// 		author: {
		// 			_id: "626f0e7610400b7982748786",
		// 			username: "elonmusk@tesla.com",
		// 			password: "teslamotors",
		// 			__v: 0,
		// 		},
		// 		title: "this is not a title",
		// 		timestamp: "2022-05-17T19:37:15.351Z",
		// 		post: "this is not a post",
		// 		published: false,
		// 		comments: [],
		// 		__v: 0,
		// 	};

		// 	request(app)
		// 		.delete(`/${post._id}`)
		// 		.set("Authorization", "Bearer " + token)
		// 		.expect("Content-Type", /json/)
		// 		.expect({ msg: "Post successfully deleted" })
		// 		.expect(200)
		// 		.then(() => {
		// 			request(app)
		// 				.get(`/${post._id}`)
		// 				.set("Authorization", "Bearer " + token)
		// 				.expect("Content-Type", /json/)
		// 				.expect({ error: "Cannot find post" })
		// 				.expect(400, done);
		// 		});
		// });
	});
