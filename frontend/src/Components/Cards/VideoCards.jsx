import VideoCard from "./VideoCard";
const VideoCards = (props) => {
	var videos = props.videos;
	return (
		<div className="flex row gap-4 mx-5 my-5">
			{videos.map((video) => {
				return (
					<VideoCard
						id={video.fileName}
						title={video.title}
						desc={video.desc}
						playVideo={props.playVideo}
						deleteVideo={props.deleteVideo}
					/>
				);
			})}
		</div>
	);
};

export default VideoCards;
