require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");

const videoFiles = {
	v1: "videos/sampleVideo1.mp4",
	v2: "videos/sampleVideo2.mp4",
};

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	res.send("Aplikacja działa");
});

app.get("/videos/:filename", (req, res) => {
	const fileName = req.params.filename;
	const filePath = videoFiles[fileName];
	if (!filePath) {
		return res.status(404).send("file not found");
	}

	const stat = fs.statSync(filePath);
	const fileSize = stat.size;
	const range = req.headers.range;

	if (range) {
		const parts = range.replace(/bytes=/, "").split("-");
		const start = parseInt(parts[0], 10);
		const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

		const chunksize = end - start + 1;
		const file = fs.createReadStream(filePath, { start, end });
		const head = {
			"Content-range": `bytes ${start}-${end}/${fileSize}`,
			"Accept-Ranges": "bytes",
			"Content-Length": chunksize,
			"Content-Type": "video/mp4",
		};
		res.writeHead(206, head);
		file.pipe(res);
	} else {
		const head = {
			"Content-Length": fileSize,
			"Content-Type": "video/mp4",
		};
		res.writeHead(200, head);
		fs.createReadStream(filePath).pipe(res);
	}
});

app.listen(process.env.PORT, () => {
	console.log(`Nasłuchiwanie na porcie ${process.env.PORT}`);
});
