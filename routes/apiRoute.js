const router = require("express").Router();
const { Workout } = require("../models/index");

router.get('/workouts', async (req, res) => {
  try {
    const aggDuration = await Workout.aggregate([
      {
        $addFields: { totalDuration: { $sum: "$exercises.duration" } },
      },
    ]);
    res.status(200).json(aggDuration);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/workouts/range', async (req, res) => {
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
  }
});

router.post('/workouts', async (req, res) => {
  try {
    await Workout.create({ day: Date.now(), ...req.body }).then((result) => {
      res.status(201).json(result);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/workouts/*', async (req, res) => {
  try {
    await Workout.findById(req.params[0]).then(async (result) => {
      const newExercises = result.exercises.concat(req.body);
      const updatedData = await Workout.findByIdAndUpdate(req.params[0], {
        exercises: newExercises,
      });
      res.status(201).json(updatedData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
