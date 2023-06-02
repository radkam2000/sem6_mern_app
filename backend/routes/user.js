const router = require("react").Router();

router.get("/", async (req, res) => {
	User.find()
		.exec()
		.then(async () => {
			const users = await User.find({ _id: req.user._id });
			//konfiguracja odpowiedzi res z przekazaniem listy użytkowników:
			res.status(200).send({
				data: users,
				message: "Account Data",
			});
			console.log(users);
		})
		.catch((error) => {
			res.status(500).send({ message: error.message });
		});
});

router.delete("/", (req, res) => {
	User.find()
		.exec()
		.then(async () => {
			console.log(`delete user: ${req.user._id}`);
			const users = await User.deleteOne({ _id: req.user._id });
			//konfiguracja odpowiedzi res z przekazaniem listy użytkowników:
			res.redirect("/");
		})
		.catch((error) => {
			res.status(500).send({ message: error.message });
		});
});

router.post("/register", (req, res) => {
	res.status(200).send("registration");
});

router.post("/password", (req, res) => {
	res.status(200).send("password change");
});

module.exports = router;
