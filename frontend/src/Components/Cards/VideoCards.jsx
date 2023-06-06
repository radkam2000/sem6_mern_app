import VideoCard from "./VideoCard";
const VideoCards = (props) => {
	const playVideo = () => {};
	var videos = props.videos;
	console.log(videos);
	videos = Object.entries(videos);
	const test = (d) => {
		console.log(d);
	};
	return (
		<ul onLoad={test(videos)}>
			{videos.map((video) => {
				<VideoCard
					title={video[1].title}
					desc={video[1].desc}
					playVideo={playVideo}
				/>;
			})}
		</ul>
	);
};

export default VideoCards;
