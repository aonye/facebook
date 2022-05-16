import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const mongoServer = await MongoMemoryServer.create();

function initializeMongoServer() {
	const mongoUri = mongoServer.getUri();

	mongoose.connect(mongoUri);

	mongoose.connection.on("error", (e) => {
		if (e.message.code === "ETIMEDOUT") {
			console.log(e);
			mongoose.connect(mongoUri);
		}
		console.log(e);
	});

	mongoose.connection.once("open", () => {
		console.log(`MongoDB successfully connected to ${mongoUri}`);
	});
}

function stopServer() {
	mongoServer.stop();
}
export { initializeMongoServer, stopServer };
