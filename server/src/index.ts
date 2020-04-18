import express = require("express");
// Create a new express app instance
const app: express.Application = express();

app.get("/", (req, res) => {
  res.send("Hello New World!");
});

app.listen(4000, () => {
  console.info("App is listening on port 4000!");
});
