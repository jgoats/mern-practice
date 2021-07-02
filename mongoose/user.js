let mongoose = require("mongoose");
let userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
// arg1 model name
// arg2 schema 
// arg3 collection name
let User = mongoose.model('User', userSchema, "myusers");

module.exports.User = User;