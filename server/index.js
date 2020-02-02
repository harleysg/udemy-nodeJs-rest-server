// -------------------------
require("./config");
// -------------------------
const PORT = process.env.PORT;
// -------------------------
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
// ------------------------- MIDDELWARES
// parse application/x-www-form-urlencoded + parse application/json
app.use(bodyParser.urlencoded({ extended: false })).use(bodyParser.json());
// -------------------------
app.get("/user", (req, res) => {
	res.json({ type: "get" });
})
	.post("/user", (req, res, next) => {
		const body = req.body;
		if (body.name === undefined || body.age === undefined) {
			res.status(400).json({
				message: paramIsRequired("name ó age")
			});
		} else {
			res.json({ type: "post", data: body });
		}
		function paramIsRequired(params) {
			return `El parametro ${params} es requerido.`;
		}
	})
	.put("/user/:id", (req, res) => {
		const paramId = req.params.id;
		res.json({ type: "put", id: paramId });
	})
	.delete("/user", (req, res) => {
		res.json({ type: "delete" });
	})
	.listen(PORT, () => {
		console.log(`Listen port: ${PORT}`);
	});
