require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const videos = require("./routes/videos");
const user = require("./routes/user");
const authenticate = require("./routes/authenticate");

app.use(express.json());
app.use(cors());

app.use("/api/user", user);
app.use("/api/authenticate", authenticate);
app.use("/api/videos", videos);

app.listen(process.env.PORT, () => {
	console.log(`Nasłuchiwanie na porcie ${process.env.PORT}`);
});
