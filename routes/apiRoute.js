const router = require('express').Router();
const mongoose = require("mongoose");
const { Exercise, Workout } = require("../models/index");

router.get('/workouts' , async (req, res) => {
    const aggDuration = await Workout.aggregate([{
        $addFields: { totalDuration:
            { $sum:  $exercises.duration}
        }
    }]);
    res.status(200).json(aggDuration);
});

router.get('/workouts/range' , async (req, res) => {
    const currentDay = new Date();
    const lastWeek = currentDay.setDate(currentDay.getDate()-7);
    const aggOldDuration = await Workout.aggregate([
        { $match: { day: { $gte: lastWeek, $lt: currentDay} } },
        {
        $addFields: { totalDuration:
            { $sum:  $exercises.duration}
        }
    }]);
    res.status(200).json(aggOldDuration);
});

router.post('/workouts', async (req, res) => {
    await Workout.create({ day: Date.now(), ...req.body})
    .then(result => console.log(result));
});

module.exports = router;