/**
 * @port
 */
process.env.PORT = process.env.PORT || 3000;

/**
 * @ENVIROMENT
 */
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

// Varidate Conection
// ------------------------- Mongoose CONFIG
let mongooseCONNECT;
let mongoosePORT;
let mongooseDB = "cafe";
const mongoAPIUri = "?retryWrites=true&w=majority"
if (process.env.NODE_ENV) {
	mongooseCONNECT = "mongodb://localhost";
	mongoosePORT = ":27017/";
} else {
	mongooseCONNECT = "mongodb+srv://hgarzon:OyDtH90DdseGuVnW";
	mongoosePORT = "@cluster0-tmkax.mongodb.net/";
}

process.env.MONGOOSEDB = mongooseCONNECT + mongoosePORT + mongooseDB + mongoAPIUri;
