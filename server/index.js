const express = require("express");
// const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path")
const profileRouter = require("./routes/profileRoute");
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

const app = express();
const PORT = process.env.PORT || 3300;

// app.use(cors());
app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(profileRouter);
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"));

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
