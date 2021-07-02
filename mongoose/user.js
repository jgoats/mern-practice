let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let user = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("User", user);