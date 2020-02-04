const express = require("express");
const bodyParser = require("body-parser");
const app = express();
// ------------------------- User Model
const User = require("../models/user");
// ------------------------- MIDDELWARES
// parse application/x-www-form-urlencoded + parse application/json
app.use(bodyParser.urlencoded({ extended: false })).use(bodyParser.json());
// -------------------------
const PORT = process.env.PORT;
// ------------------------- HELPERS
function paramIsRequired(params) {
	return `El parametro ${params} es requerido.`;
}
// ------------------------- ROUTES
app.get("/user", (req, res) => {
	res.json({ type: "get" });
})
	.post("/user", (req, res, next) => {
		const body = req.body;

		let user = new User({
			name: body.name,
			email: body.email,
			password: body.password,
			role: body.role
		});

		user.save((err, userDB) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					err
				});
			}
			res.json({
				ok: true,
				data: userDB
			});
		});

		// if (
		// 	body === undefined ||
		// 	body.name === undefined ||
		// 	body.age === undefined
		// ) {
		// 	res.status(400).json({
		// 		message: paramIsRequired("name ó age")
		// 	});
		// } else {
		// 	res.json({ type: "post", data: body });
		// }
	})
	.put("/user/:id", (req, res) => {
		const paramId = req.params.id;
		if (paramId) {
			res.json({ type: "put", id: paramId });
		} else {
			res.status(400).json({ message: paramIsRequired("id") });
		}
	})
	.delete("/user", (req, res) => {
		res.json({ type: "delete" });
	})
	.listen(PORT, () => {
		console.log(`Listen port: ${PORT}`);
	});

module.exports = app;
