const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Exercise = require("./exercise");

const schema = new Schema ({
    day: Date,
    exercises: [Exercise],
});

const Workout = mongoose.model("Workout", schema);

module.exports = Workout;