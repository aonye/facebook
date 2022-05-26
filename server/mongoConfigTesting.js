import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const mongoServer = await MongoMemoryServer.create();

async function initializeMongoServer() {
	const mongoUri = mongoServer.getUri();

	await mongoose.connect(mongoUri);

	mongoose.connection.on("error", (e) => {
		if (e.message.code === "ETIMEDOUT") {
			console.log(e);
			mongoose.connect(mongoUri);
		}
		console.log(e);
	});

	mongoose.connection.once("open", () => {
		return console.log(`MongoDB successfully connected to ${mongoUri}`);
	});
}

async function stopServer() {
	await mongoServer.stop();
}
export { initializeMongoServer, stopServer };
