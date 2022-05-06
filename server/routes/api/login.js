import express from "express";
import jwt from "jsonwebtoken";
import passport from "../../passport.js";
import "dotenv/config";

const loginRouter = express.Router();

/* POST login */
loginRouter.post("/", (req, res) => {
	passport.authenticate("local", { session: false }, (err, user) => {
		if (err || !user) {
			return res.status(400).json({
				message: "Something is not right",
				user: user,
			});
		}
		req.login(user, { session: false }, (err) => {
			if (err) {
				res.send(err);
			}
			const userInfo = {
				id: user._id.toString(),
			};
			const token = jwt.sign(userInfo, process.env.SECRET, {});
			return res.json({ token });
		});
	})(req, res);
});

export default loginRouter;
