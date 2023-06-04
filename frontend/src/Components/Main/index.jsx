import { useState } from "react";

import VideoPlayer from "../VideoPlayer";
import Navbar from "../Navbar";
import { VideoCards } from "../Cards";
import Profile from "../Profile";
import axios from "axios";

const Main = () => {
	const [componentToShow, setComponentToShow] = useState("cards");
	const [data, setData] = useState();
	const [msg, setMsg] = useState();

	const videos = async () => {
		const { data: res } = await axios.get(
			"http://localhost:5000/api/videos"
		);
		return res.videos;
	};

	return (
		<div className="Main" onLoad={videos}>
			<Navbar />
			<button onClick={videos}>BUTTON</button>
			<VideoCards videos={videos} />
			{() => {
				switch (componentToShow) {
					case "cards":
						<VideoCards />;
						break;
					case "video":
						<VideoPlayer />;
						break;
					case "profile":
						<Profile />;
						break;
					default:
						<button onClick={videos}></button>;
						//<VideoCards videos={videos} />;
						break;
				}
			}}
		</div>
	);
};

export default Main;
