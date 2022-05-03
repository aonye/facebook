import mongoose from "mongoose";
import "dotenv/config";

// mongoose / mongoDB;
mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

export default mongoose;
