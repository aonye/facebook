import { body, validationResult } from "express-validator";
import User from "../../models/user.js";

export const users_index_get = async (req, res) => {
	const users = await User.find({});
	console.log(users);
	return users && users.length !== 0
		? res.status(200).json(users)
		: res.status(400).json({ error: "No users" });
};

export const user_get = async (req, res) => {
	const user = await User.findById(req.params.userId);
	return user
		? res.status(200).json(user)
		: res.status(404).json({ error: "User not found" });
};

export const user_post = [
	body("username")
		.trim()
		.isEmail()
		.withMessage("Entry is not an email.")
		.isLength({ min: 1, max: 30 })
		.withMessage("Entry is too long.")
		.custom((username) => {
			return User.findOne({ username }).then((res) => {
				//check if name is already taken
				if (res) {
					console.log("already taken");
					return Promise.reject("Username (email) is already taken.");
				}
			});
		})
		.escape(),
	body("password")
		.trim()
		.isLength({ min: 6, max: 30 })
		.withMessage("Password must be between 6 and 30 chars"), //don't escape (mutates pw)
	body("confirmpw")
		.trim()
		.isLength({ min: 6, max: 30 })
		.withMessage("Password must be between 6 and 30 chars")
		.custom((confirmpw, { req }) => {
			if (confirmpw !== req.body.password) {
				throw new Error("Passwords must match");
			}
			return true;
		}),

	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json(errors.array());
		}

		const user = new User({
			username: req.body.username,
			password: req.body.password,
		});

		const result = user.save();
		return result
			? res.status(200).json({ msg: "User successfully added" })
			: res.status(400).json({ error: "Error saving user" });

		// bcrypt.hash(user.password, 5, (err, hashedPassword) => {
		//     if (err) { return next(err) }
		//     else { //store hashpw in db, save user
		//         user.password = hashedPassword;
		//         user.save(err => {
		//             if (err) { return next(err); }
		//             return res.redirect('/api/');
		//         });
		//     }
		// });
	},
];

export const user_put = [
	body("username")
		.trim()
		.isLength({ min: 1, max: 30 })
		.withMessage("Entry is too long.")
		.isEmail()
		.withMessage("Entry is not an email.")
		.custom((username, { req }) => {
			return User.findById(req.params.userId).then((user) => {
				// check if the name is unchanged
				if (user.username === username) {
					return Promise.resolve();
				} else {
					return User.findOne({ username }).then((res) => {
						//check if name is already taken
						if (res) {
							return Promise.reject(
								"Username (email) is already taken."
							);
						}
					});
				}
			});
		})
		.escape(),
	body("password")
		.trim()
		.isLength({ min: 6, max: 30 })
		.withMessage("Password must be between 6 and 30 chars"), //don't escape (mutates pw)
	body("confirmpw")
		.trim()
		.isLength({ min: 6, max: 30 })
		.withMessage("Password must be between 6 and 30 chars")
		.custom((confirmpw, { req }) => {
			if (confirmpw !== req.body.password) {
				throw new Error("Passwords must match");
			}
			return true;
		}),

	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json(errors.array());
		}

		const user = await User.findById(req.params.userId);
		if (user) {
			user.username = req.body.username;
			user.password = req.body.password;
			return user.save()
				? res.status(200).json({ msg: "User successfully updated" })
				: res.status(400).json({ error: "Error updating user" });
		}
		return res.status(404).json({ error: "User not found" });
		// bcrypt.hash(user.password, 5, (err, hashedPassword) => {
		//     if (err) { return next(err) }
		//     else { //store hashpw in db, save user
		//         user.password = hashedPassword;
		//         User.findByIdAndUpdate(req.params.id, user, {}, (err, result) => {
		//             if (err) { return next(err); }
		//             return res.redirect('/api');
		//         });
		//     }
		// });
	},
];

export const user_delete = async (req, res) => {
	//only allow delete with permission
	const user = await User.findById(req.params.userId);
	if (user) {
		return user.remove()
			? res.status(200).json({ msg: "User deleted" })
			: res.status(400).json({ error: "Error removing user" });
	}
	return res.status(404).json({ error: "User not found" });
};
