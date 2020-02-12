const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("underscore");
const bodyParser = require("body-parser");
const app = express();
// ------------------------- UserModel Model
const UserModel = require("../models/user");
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
	const from = Number(req.query.from) || 0;
	const limit = Number(req.query.limit) || 10;
	const status = req.query.status || true;
	const fields = req.query.fields || "";

	UserModel.find({ state: status }, fields)
		.skip(from)
		.limit(limit)
		.exec((err, users) => {
			if (err)
				return res.status(400).json({ success: false, message: err });
			UserModel.countDocuments({ state: status }, (err, count) => {
				res.json({
					success: true,
					count,
					users
				});
			});
		});
})
	.post("/user", (req, res, next) => {
		const body = req.body;

		let user = new UserModel({
			name: body.name,
			email: body.email,
			password: bcrypt.hashSync(body.password, 10),
			role: body.role
		});

		user.save((err, userDB) => {
			if (err) {
				return res.status(400).json({
					success: false,
					message: err
				});
			}
			res.json({
				success: true,
				message: "User saved",
				data: userDB
			});
		});
	})
	.put("/user", (req, res) => {
		const paramId = req.query.id;
		const body = _.pick(req.body, [
			"name",
			"email",
			"image",
			"role",
			"state"
		]);
		UserModel.findByIdAndUpdate(
			paramId,
			body,
			{
				new: true /** Opción para devolver el dato actualizado al frontend*/,
				runValidators: true /** ejecutar validaciones de  definidas en el esquema */
			},
			(err, userDB) => {
				if (err) {
					return res
						.status(400)
						.json({ success: false, message: err });
				}
				res.json({ success: true, user: userDB });
			}
		);
	})
	.delete("/deleteUser/:id", (req, res) => {
		const ID = req.params.id;
		if (!ID) {
			return res.status(400).json({
				success: false,
				message: paramIsRequired("id")
			});
		}
		UserModel.findByIdAndRemove(ID, (err, userDeleted) => {
			if (err) {
				return res.status(400).json({
					success: false,
					message: err
				});
			}
			if (!userDeleted) {
				return res.status(400).json({
					success: false,
					message: "User dont found"
				});
			}
			res.json({
				success: true,
				user: userDeleted
			});
		});
	})
	.delete("/disableUser/:id", (req, res) => {
		const ID = req.params.id;
		if (!ID) {
			return res.status(400).json({
				success: false,
				message: paramIsRequired("id")
			});
		}
		UserModel.findByIdAndUpdate(
			ID,
			{ state: false },
			{ new: true },
			(err, user) => {
				if (err) {
					return res
						.status(400)
						.json({ success: false, message: err });
				}

				res.json({
					success: true,
					message: `User is already disabled`
				});
			}
		);
	})
	.listen(PORT, () => {
		console.log(`Listen port: ${PORT}`);
	});

module.exports = app;
