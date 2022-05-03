import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema({
	author: { type: Schema.Types.ObjectId, required: true, ref: "User" },
	title: { type: String, required: true, maxlength: 30 },
	timestamp: { type: Date, required: true },
	post: { type: String, required: true, maxlength: 10000 },
	published: { type: Boolean, required: true },
	comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

export default mongoose.model("Post", PostSchema);
