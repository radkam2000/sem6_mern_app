require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const videos = require("./routes/videos");
const user = require("./routes/user");
const auth = require("./routes/auth");
const jwt_auth = require("./middleware/jwt_auth");

app.use(express.json());
app.use(cors());

const connection = require("./db");
connection();

app.use("/api/user", user);
app.use("/api/auth", auth);
app.post("/api/videos", jwt_auth);
app.delete("/api/videos", jwt_auth);
app.use("/api/videos", videos);

app.listen(process.env.PORT, () => {
	console.log(`Nasłuchiwanie na porcie ${process.env.PORT}`);
});
