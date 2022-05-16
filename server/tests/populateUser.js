/* eslint-disable no-undef */
import loginRouter from "../routes/api/login.js";
import express from "express";
import request from "supertest";

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use("/login", loginRouter);

export async function getTokenFromUser() {
	const res = await request(app)
		.post("/login")
		.send("username=elonmusk@tesla.com")
		.send("password=teslamotors")
		.expect(200);
	if (res && res._body.token) {
		return res._body.token;
	}
}
