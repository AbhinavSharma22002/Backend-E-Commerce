const connectToMongo = require("./db");
connectToMongo();
let server_port = process.env.YOUR_PORT || process.env.PORT || 500;
let server_host = process.env.YOUR_HOST || '0.0.0.0';
const express = require("express");
const app = express();
const Cors = require("cors");
app.use(Cors());
app.use(express.json());

//availabel routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/notes", require("./routes/notes.js"));

// app.listen(process.env.PORT || port, () => {
//   console.log(`Listening at http://localhost:${port}`);
// });

app.listen(server_port, server_host, function() {
  console.log('Listening on port %d', server_port);
});