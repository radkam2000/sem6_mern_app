const router = require("express").Router();
const fs = require("fs");
const multer = require("multer");
const { Video, validate } = require("../models/Video");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, __dirname + "/../videos/");
	},
	filename: function (req, file, cb) {
		const uniqueNum = Date.now() + "" + Math.round(Math.random() * 1e9);
		cb(null, uniqueNum + ".mp4");
	},
});

const uploads = multer({ storage: storage });

router.post("/upload", uploads.single("file"), async (req, res) => {
	try {
		const { error } = validate();
		if (error)
			return res.status(400).send({ message: error.details[0].message });
		const video = {
			fileName: req.file.filename.slice(0, -4),
			title: req.body.videoTitle,
			desc: req.body.videoDesc,
			path: "videos/" + req.file.filename,
		};
		const vid = await Video.findOne({ fileName: req.file.filename });
		if (vid)
			return res
				.status(409)
				.send({ message: "Video with given email already Exist!" });
		await new Video({ ...video }).save();
		res.status(201).send({ message: "Video added successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/", async (req, res) => {
	try {
		const vid = await Video.find();
		res.status(200).send({ data: vid });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.delete("/:filename", async (req, res) => {
	try {
		const vid = await Video.findOne({ fileName: req.params.filename });
		const filePath = vid.path;
		await fs.unlink(filePath, (err) => {
			console.error(err);
		});
		await vid.deleteOne();
		res.status(200).send({ message: "Video deleted successfully" });
	} catch (err) {
		console.log(err);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/:filename", async (req, res) => {
	try {
		const vid = await Video.findOne({ fileName: req.params.filename });
		const filePath = vid.path;
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
	} catch (err) {
		console.log(err);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
