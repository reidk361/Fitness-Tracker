const router = require('express').Router();
const apiRoute = require("./apiRoute");
const htmlRoute = require("./htmlRoute")

router.use("/", htmlRoute);
router.use("/api", apiRoute);

module.exports = router;