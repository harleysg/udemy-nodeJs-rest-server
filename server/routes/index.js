const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("underscore");
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
			password: bcrypt.hashSync(body.password, 10),
			role: body.role
		});

		user.save((err, userDB) => {
			if (err) {
				return res.status(400).json({
					ok: false,
					message: err
				});
			}
			res.json({
				ok: true,
				data: userDB
			});
		});
	})
	.put("/user/:id", (req, res) => {
		const paramId = req.params.id;
		const body = _.pick(req.body, [
			"name",
			"email",
			"image",
			"role",
			"state"
		]);
		User.findByIdAndUpdate(
			paramId,
			body,
			{
				new: true /** Opción para devolver el dato actualizado al frontend*/,
				runValidators: true /** ejecutar validaciones de  definidas en el esquema */
			},
			(err, userDB) => {
				if (err) {
					return res.status(400).json({ ok: false, message: err });
				}
				res.json({ ok: true, user: userDB });
			}
		);
	})
	.delete("/user", (req, res) => {
		res.json({ type: "delete" });
	})
	.listen(PORT, () => {
		console.log(`Listen port: ${PORT}`);
	});

module.exports = app;
