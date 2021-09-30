const express = require('express');
const app = express();
const mongoose = require("mongoose");
const path = require('path');
const routes = require('./routes/index');
require('dotenv').config();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/", routes);

mongoose.connect(process.env.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
    .then(app.listen(PORT, () => console.log(`Listening at: http://localhost:${PORT}`)));
