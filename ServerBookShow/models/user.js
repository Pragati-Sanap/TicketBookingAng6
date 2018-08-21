var mongoose = require('mongoose');
var mongooseTimestamp = require("mongoose-timestamp");
var Schema = mongoose.Schema;

var user = new Schema({
    name:String,
    email:String,
    seats:[String],
    price:String,
    eventDate:Date,
    status:String,
    ctime:String
});
user.plugin(mongooseTimestamp);
mongoose.model('user', user);
module.exports = mongoose.model('user',user);