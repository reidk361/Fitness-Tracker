const router = require("express").Router();
const mongoose = require("mongoose");
const { Exercise, Workout } = require("../models/index");

router.get("/workouts", async (req, res) => {
  try {
    const aggDuration = await Workout.aggregate([
      {
        $addFields: { totalDuration: { $sum: "$exercises.duration" } },
      },
    ]);
    res.status(200).json(aggDuration);
    // await Workout.find({}).then((result) => res.status(200).json(result))
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.get("/workouts/range", async (req, res) => {
  const currentTime = new Date();
  const currentDay = new Date(currentTime.setDate(currentTime.getDate()));
  const lastWeek = new Date(currentTime.setDate(currentTime.getDate() - 7));
  try {
    const aggOldDuration = await Workout.aggregate([
      { $match: { day: { $gte: lastWeek, $lt: currentDay } } },
      {
        $addFields: { totalDuration: { $sum: "$exercises.duration" } },
      },
    ]);
    res.status(200).json(aggOldDuration);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.post("/workouts", async (req, res) => {
  try {
    await Workout.create({ day: Date.now(), ...req.body }).then((result) => {
      res.status(201).json(result);
      console.log(result);
    });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;