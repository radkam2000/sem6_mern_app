import React, { useEffect, useRef } from "react";

const VideoPlayer = ({ videoId }) => {
	const videoRef = useRef(null);

	return (
		<video
			ref={videoRef}
			className="mx-auto my-4"
			width="800px"
			height="500px"
			controls
		>
			<source
				src={`http://localhost:5000/api/videos/${videoId}`}
				type="video/mp4"
			></source>
		</video>
	);
};

export default VideoPlayer;
