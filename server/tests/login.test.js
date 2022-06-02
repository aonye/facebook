/* eslint-disable no-undef */
import { beforeAll } from "@jest/globals";

import { initializeMongoServer, stopServer } from "../mongoConfigTesting.js";
import { populate } from "./populateDBTesting.js";

import userRouter from "../routes/api/users";
import request from "supertest";
import express from "express";
import { getTokenFromUser } from "./testHelper.js";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", userRouter);

let token;

beforeAll(async () => {
	await initializeMongoServer();
	await populate();
	token = getTokenFromUser();
});

afterAll(async () => {
	await stopServer();
});

test("users/index/getall (secret) route works", (done) => {
	const users = [
		{
			_id: "626f0e7610400b7982748786",
			username: "elonmusk@tesla.com",
			password: "teslamotors",
			__v: 0,
		},
		{
			_id: "626f0e7610400b7982748787",
			username: "aaaaaa@aaaaaa.com",
			password: "aaaaaa",
			__v: 0,
		},
		{
			_id: "626f0e7610400b7982748788",
			username: "bbbbbb@bbbbbb.com",
			password: "bbbbbb",
			__v: 0,
		},
	];
	request(app)
		.get("/secret")
		.set("Authorization", "Bearer " + token)
		.expect("Content-Type", /json/)
		.expect(users)
		.expect(200, done);
});

test("users/get/:userId route works", (done) => {
	const users = [
		{
			_id: "626f0e7610400b7982748786",
			username: "elonmusk@tesla.com",
			password: "teslamotors",
			__v: 0,
		},
		{
			_id: "626f0e7610400b7982748787",
			username: "aaaaaa@aaaaaa.com",
			password: "aaaaaa",
			__v: 0,
		},
		{
			_id: "626f0e7610400b7982748788",
			username: "bbbbbb@bbbbbb.com",
			password: "bbbbbb",
			__v: 0,
		},
	];
	request(app)
		.get(`/${users[0]._id}`)
		.set("Authorization", "Bearer " + token)
		.expect("Content-Type", /json/)
		.expect(users[0])
		.expect(200, done);
});

test("users/post route works", (done) => {
	const newUser = {
		_id: "626f0e7610400b7982748789",
		username: "jeffbezos@amazon.com",
		password: "amazon",
		__v: 0,
	};
	request(app)
		.post("/")
		.set("Authorization", "Bearer " + token)
		.type("form")
		.send({
			username: newUser.username,
			password: newUser.password,
			confirmpw: newUser.password,
			id: newUser._id,
		})
		.expect("Content-Type", /json/)
		.expect({ msg: "User successfully added" })
		.expect(200)
		.then(() => {
			request(app)
				.get(`/${newUser._id}`)
				.set("Authorization", "Bearer " + token)
				.expect("Content-Type", /json/)
				.expect(newUser)
				.expect(200, done);
		});
});

test("users/post route error with password confirmation", (done) => {
	const newUser = {
		_id: "626f0e7610400b7982748790",
		username: "jeffbezos2@amazon2.com",
		password: "amazon2",
		__v: 0,
	};
	request(app)
		.post("/")
		.set("Authorization", "Bearer " + token)
		.type("form")
		.send({
			username: newUser.username,
			password: newUser.password,
			confirmpw: "44444",
			id: newUser._id,
		})
		.expect("Content-Type", /json/)
		.expect({ msg: "User successfully added" })
		.expect(400, done);
});
