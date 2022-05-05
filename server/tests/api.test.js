/* eslint-disable no-undef */
import APIRouter from "../routes/api/index.js";
import request from "supertest";
import express from "express";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", APIRouter);

// app.get("/user", function (req, res) {
// 	res.status(200).json({ name: "john" });
// });

test("index/api/get route works", (done) => {
	request(app)
		.get("/")
		.expect("Content-Type", /json/)
		.expect({ msg: "Welcome to Aonye Blog API" })
		.expect(200, done);
});

// test("test/post route works", (done) => {
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
