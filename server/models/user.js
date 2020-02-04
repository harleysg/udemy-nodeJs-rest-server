const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
//-----------------------
const Schema = mongoose.Schema;
//-----------------------
const enumROLES = {
	values: ["ADMIN_ROLE", "USER_ROLE"],
	message: "{VALUE} isn't valid role."
};
//-----------------------
const userSchema = new Schema({
	name: {
		type: String,
		required: [true, "El nombre es necesario."]
	},
	email: {
		type: String,
		unique: true,
		index: true,
		required: [true, "El correo es necesario."]
	},
	password: {
		type: String,
		required: [true, "La contraseña es necesaria."]
	},
	image: { type: String, required: false },
	role: { type: String, default: "USER_ROLE", enum: enumROLES },
	state: { type: Boolean, default: true },
	google: { type: Boolean, default: false }
});

userSchema.methods.toJSON = function() {
	let user = this;
	const userObject = user.toObject();
	delete userObject.password;
	return userObject;
};

userSchema.plugin(uniqueValidator, {
	message: "{PATH} debe ser unico."
});

module.exports = mongoose.model("User", userSchema);
