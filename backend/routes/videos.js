const router = require("express").Router();
const fs = require("fs");

const videoFiles = {
	v1: {
		path: "videos/sampleVideo1.mp4",
		title: "Rabbit",
		desc: "Video of a rabbit coming out from his hole",
	},
	v2: {
		path: "videos/sampleVideo2.mp4",
		title: "South park",
		desc: "Part of the Sout Park episode",
	},
};

router.get("/", (req, res) => {
	res.status(200).send({ videos: videoFiles });
});

router.get("/:filename", (req, res) => {
	const fileName = req.params.filename;
	const filePath = videoFiles[fileName].path;
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

module.exports = router;
