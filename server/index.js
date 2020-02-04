// -------------------------
require("./config");
// -------------------------
const express = require("express");
const app = express();
// ------------------------- EXPRESS
app.use(require("./routes"));
// ------------------------- MONGODB
const mongoose = require("mongoose");
mongoose.set("useUnifiedTopology", true); // DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
mongoose.set("useCreateIndex", true); // DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
mongoose.set("useNewUrlParser", true); // DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
// ------------------------- define Mongoose DB
mongoose.connect(
	"mongodb://localhost:27017/cafe",
	{ useNewUrlParser: true },
	(err, res) => {
		if (err) throw err;
		console.log(`Base de datos Online`);
	}
);
