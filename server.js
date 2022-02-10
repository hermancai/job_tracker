const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

app.get("/", (req, res) => {
  res.json({ status: 200 });
});

app.use("/account", require("./routes/account"));
app.use("/posting", require("./routes/posting"));
app.use("/postings", require("./routes/postings"));
app.use("/resume", require("./routes/resume"));
app.use("/offers", require("./routes/offers"));

// Local port 3000 is used by client
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
