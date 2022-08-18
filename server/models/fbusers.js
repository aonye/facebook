import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	firstName: { type: String, minlength: 1, required: true },
	lastName: { type: String, minlength: 1, required: true },
	username: { type: String, required: true }, // set min and max length for email/pw later
	password: { type: String, required: true },
	friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

// // MessageSchema
// //     .virtual('url')
// //     .get(function () {
// //         return '/message/' + this._id;
// //     });

// // MessageSchema
// //     .virtual('timestamp_format')
// //     .get(function () {
// //         return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATETIME_SHORT);
// //     });

export default mongoose.model("FbUser", UserSchema);
