import React from 'react';
import HeaderStream from "../user/HeaderStream";
import VideoStreaming from '../user/VideoStreaming'


const VideoStreamingPage = () => {
  return (
    <>
      <HeaderStream />
      <div>
        <VideoStreaming />
      </div>
    </>
  );
}

export default VideoStreamingPage