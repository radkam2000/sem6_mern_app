require("dotenv").config();
const express = require("express");
const videos = require("./routes/videos");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use("/api/videos", videos);

app.get("/", (req, res) => {
	res.send("Aplikacja działa");
});

app.listen(process.env.PORT, () => {
	console.log(`Nasłuchiwanie na porcie ${process.env.PORT}`);
});
