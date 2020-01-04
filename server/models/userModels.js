const mongoose = require("mongoose");

const MONGO_URI =
"mongodb+srv://codesmith:codesmith1234@cluster0-ylpyd.mongodb.net/test?retryWrites=true&w=majority";

mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "scratch"
    })
    .then(() => console.log("Connected to Mongo DB...."))
    .catch(err => console.log(err));