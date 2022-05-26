import { beforeAll, afterAll, describe } from "@jest/globals";
import { initializeMongoServer, stopServer } from "../mongoConfigTesting.js";
import { postTests } from "./posts.js";
import { populate } from "./populateDBTesting.js";

import postRouter from "../routes/api/posts.js";
import express from "express";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", postRouter);

describe("PostTests", () => {
	beforeAll(async () => {
		await initializeMongoServer();
		await populate();
	});
	afterAll(async () => {
		await stopServer();
	});
	postTests();
});
