const connectToMongo = require("./db");
connectToMongo();

const express = require("express");
const app = express();
const port = 5000;
const Cors = require("cors");
app.use(Cors());
app.use(express.json());

//availabel routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/notes", require("./routes/notes.js"));

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
