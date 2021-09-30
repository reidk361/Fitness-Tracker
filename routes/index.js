const router = require('express').Router();
const apiRoute = require("./apiRoute");
const htmlRoute = require("./htmlRoute")

router.use("/api", apiRoute);
router.use("/", htmlRoute);

module.exports = router;