const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema ({
    type: String,
    name: String,
    duration: Number,
    weight: Number,
    reps: Number,
    sets: Number,
});

const Excercise = mongoose.model("Excercise", schema);

module.exports = Excercise;