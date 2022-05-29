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
						{
							_id: "62817209b96ad77c3f084870",
							author: {
								_id: "626f0e7610400b7982748786",
								username: "elonmusk@tesla.com",
								password: "teslamotors",
								__v: 0,
							},
							text: "I am making a new comment",
							timestamp: "2000-01-02T00:00:00.000Z",
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
			const firstPostLastComment = posts[0].comments[2];
			request(app)
				.post(`/${posts[0]._id}/comments`)
				.set("Authorization", "Bearer " + token)
				.type("form")
				.send({
					userId: firstPostLastComment.author._id,
					text: firstPostLastComment.text,
					timestamp: firstPostLastComment.timestamp,
					commentId: firstPostLastComment._id,
				})
				.expect("Content-Type", /json/)
				.expect({ msg: "Success. Comment saved to post" })
				.expect(200)
				.then(() => {
					request(app)
						.get(`/${posts[0]._id}/comments`)
						.set("Authorization", "Bearer " + token)
						.expect("Content-Type", /json/)
						.expect(posts[0].comments)
						.expect(200, done);
				});
		});

		test("comments/PUT :postId/comments/:commentId route", (done) => {
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
						{
							_id: "62817209b96ad77c3f084870",
							author: {
								_id: "626f0e7610400b7982748786",
								username: "elonmusk@tesla.com",
								password: "teslamotors",
								__v: 0,
							},
							text: "Editing this text for test",
							timestamp: "2000-01-02T00:00:00.000Z",
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
			const firstPostLastComment = posts[0].comments[2];
			request(app)
				.put(`/${posts[0]._id}/comments/${firstPostLastComment._id}`)
				.set("Authorization", "Bearer " + token)
				.type("form")
				.send({
					text: "Editing this text for test",
				})
				.expect(200)
				.then(() => {
					request(app)
						.get(`/${posts[0]._id}/comments`)
						.set("Authorization", "Bearer " + token)
						.expect("Content-Type", /json/)
						.expect(posts[0].comments)
						.expect(200, done);
				});
		});

		test("comments/DELETE :postId/comments/:commentId route", (done) => {
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
			request(app)
				.delete(`/${posts[0]._id}/comments/62817209b96ad77c3f084870`)
				.set("Authorization", "Bearer " + token)
				.expect(200)
				.then(() => {
					request(app)
						.get(`/${posts[0]._id}/comments`)
						.set("Authorization", "Bearer " + token)
						.expect("Content-Type", /json/)
						.expect(posts[0].comments)
						.expect(200, done);
				});
		});
	});
