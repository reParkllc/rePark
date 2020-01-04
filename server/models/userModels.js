const mongoose = require("mongoose");

const MONGO_URI =
  "mongodb+srv://codesmith:codesmith1234@cluster0-ylpyd.mongodb.net/test?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "rePark"
  })
  .then(() => console.log("Connected to Mongo DB...."))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

//set schema for user
const userSchema = new Schema({
  name: { type: String, required: true, unique: true },
  pass: { type: String, required: true },
  car: {
    car_brand: { type: String, required: true },
    car_model: { type: String, required: true },
    car_color: { type: String, required: true }
  }
});

const User = mongoose.model("user", userSchema);

module.exports = {
  User
};
