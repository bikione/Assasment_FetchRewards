// Import Modules
const config = require("config");
const express = require("express");
const app = express();

//Allow json
app.use(
  express.json({
    extended: false,
  })
);

// Routes

app.use("/api/customer", require("./router/customer"));

const PORT = config.get("PORT") || 8080;
// Running Appllication
app.listen(PORT, () => {
  console.log(
    "Application is running succesfully on port:",
    config.get("PORT")
  );
});
