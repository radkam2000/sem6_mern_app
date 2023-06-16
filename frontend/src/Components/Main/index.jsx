import { useState } from "react";

import VideoPlayer from "../VideoPlayer";
import Navbar from "../Navbar";
import { VideoCard, VideoCards } from "../Cards";
import Profile from "../Profile";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Main = () => {
	const [content, setContent] = useState("cards");
	const [data, setData] = useState();
	const [msg, setMsg] = useState();
	const [videosData, setVideosData] = useState([]);
	const [videoId, setVideoId] = useState();

	const toastConfig = {
		position: "bottom-right",
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "dark",
	};

	const notify = (message) => toast(message, toastConfig);

	const videos = async () => {
		const { data: res } = await axios.get(
			"http://localhost:5000/api/videos"
		);
		setVideosData(res.data);
	};

	const playVideo = (id) => {
		setVideoId(id);
		setContent("videoPlayer");
	};

	const deleteVideo = async (id) => {
		const token = localStorage.getItem("token");
		if (token) {
			try {
				const config = {
					method: "delete",
					url: "http://localhost:5000/api/videos/" + id,
					headers: {
						"Content-Type": "application/json",
						"x-access-token": token,
					},
				};
				const { data: res } = await axios(config);
				notify(res.message);
				videos();
			} catch (err) {
				console.log(err);
				notify("Error occured");
			}
		}
	};

	return (
		<div className="Main" onLoad={videos}>
			<Navbar setContent={setContent} setMsg={setMsg} setData={setData} />
			{videosData && content === "cards" ? (
				<VideoCards
					videos={videosData}
					playVideo={playVideo}
					deleteVideo={deleteVideo}
				/>
			) : (
				""
			)}
			{content === "profile" ? (
				<Profile data={data} notify={notify} refreshVideos={videos} />
			) : (
				""
			)}
			{content === "videoPlayer" ? <VideoPlayer videoId={videoId} /> : ""}
			<ToastContainer />
		</div>
	);
};

export default Main;
