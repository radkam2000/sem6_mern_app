import { useState } from "react";

import VideoPlayer from "../VideoPlayer";
import Navbar from "../Navbar";
import { VideoCard } from "../Cards";
import Profile from "../Profile";
import axios from "axios";

const Main = () => {
	const [content, setContent] = useState("cards");
	const [data, setData] = useState();
	const [msg, setMsg] = useState();
	const [videosData, setVideosData] = useState();
	const [videoId, setVideoId] = useState();

	const videos = async () => {
		const { data: res } = await axios.get(
			"http://localhost:5000/api/videos"
		);
		setVideosData(res.videos);
	};

	const playVideo = (id) => {
		setVideoId(id);
		setContent("videoPlayer");
	};

	return (
		<div className="Main" onLoad={videos}>
			<Navbar setContent={setContent} setMsg={setMsg} setData={setData} />
			{videosData && content === "cards" ? (
				<div className="flex row gap-4 mx-5 my-5">
					<VideoCard
						id={"v1"}
						title={videosData.v1.title}
						desc={videosData.v1.desc}
						playVideo={playVideo}
					/>
					<VideoCard
						id={"v2"}
						title={videosData.v2.title}
						desc={videosData.v2.desc}
						playVideo={playVideo}
					/>
				</div>
			) : (
				""
			)}
			{content === "profile" ? <Profile data={data} /> : ""}
			{content === "videoPlayer" ? <VideoPlayer videoId={videoId} /> : ""}
		</div>
	);
};

export default Main;
