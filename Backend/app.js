const express = require("express");
const app = express();

// parse requests of content-type - application/json
app.use(express.json({ extended: true }));

app.use("/user", require("./routes/hr/user/user.route"));


module.exports = app;