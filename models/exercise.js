const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Exercise = new Schema ({
    type: String,
    name: String,
    duration: Number,
    weight: Number,
    reps: Number,
    sets: Number,
});

module.exports = Exercise;