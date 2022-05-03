import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: { type: String, required: true }, // set min and max length for email/pw later
	password: { type: String, required: true },
});

// MessageSchema
//     .virtual('url')
//     .get(function () {
//         return '/message/' + this._id;
//     });

// MessageSchema
//     .virtual('timestamp_format')
//     .get(function () {
//         return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATETIME_SHORT);
//     });

export default mongoose.model("User", UserSchema);
