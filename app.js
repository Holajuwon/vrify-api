const express = require("express");
const cors = require("cors");

const { db } = require("./src/db");
const { createUserTable } = require("./src/db/queries");
const router = require("./src/routes");
const { errorResponse } = require("./src/utils/errorResponse");

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// routes/v1
app.use("/api/v1", router);

db.connect()
  .then((obj) => {
    console.log("Connected to database");
    app.listen(port, () => {
      db.any(createUserTable);
      obj.done();
      console.log(`Server running on port ${port} 🔥`);
    });
  })
  .catch((err) => {
    console.log("Could not connect to database", err);
    process.exit();
  });

//error handling middleware
app.use((err, req, res, next) => {
  errorResponse(req, res, err.status || 500, err.message);
});

module.exports = app;
