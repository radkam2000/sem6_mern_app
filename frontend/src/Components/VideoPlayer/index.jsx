import React, { useEffect, useRef } from "react";

const VideoPlayer = ({ videoId }) => {
	const videoRef = useRef(null);

	return (
		<video ref={videoRef} width="100vw" height="auto">
			<source
				src={`http://localhost:5000/api/videos/${videoId}`}
				type="video/mp4"
			></source>
		</video>
	);
};

export default VideoPlayer;
