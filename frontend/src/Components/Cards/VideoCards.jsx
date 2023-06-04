import VideoCard from "./VideoCard";
const VideoCards = (props) => {
	const playVideo = () => {};
	const videos = props.videos;
	return (
		<ul>
			{videos.map((video) => {
				<VideoCard
					title={video.title}
					desc={video.desc}
					playVideo={playVideo}
				/>;
			})}
		</ul>
	);
};

export default VideoCards;
