import { beforeAll, afterAll, describe } from "@jest/globals";
import { initializeMongoServer, stopServer } from "../mongoConfigTesting.js";
import { populate } from "./populateDBTesting.js";

import { postTests } from "./posts.js";
import { commentTests } from "./comments.js";

describe("PostCommentsTests", () => {
	beforeAll(async () => {
		await initializeMongoServer();
		await populate();
	});
	afterAll(async () => {
		await stopServer();
	});
	postTests();
	commentTests();
});
