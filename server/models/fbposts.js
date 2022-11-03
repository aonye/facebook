// import mongoose from "mongoose";

// const Schema = mongoose.Schema;

// const PostSchema = new Schema({
// 	author: { type: Schema.Types.ObjectId, required: true, ref: "User" },
// 	title: { type: String, required: true, minlength: 1, maxlength: 30 },
// 	timestamp: { type: Date, required: true },
// 	post: { type: String, required: true, minlength: 1, maxlength: 10000 },
// 	published: { type: Boolean, required: true },
// 	likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
// 	comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
// });

// export default mongoose.model("Post", PostSchema);
