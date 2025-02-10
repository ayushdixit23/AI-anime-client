"use client";
import React from "react";
import videojs from "video.js";
// This imports the functional component from the previous sample.
import VideoJS from "./Trialvideoplayer";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";

const Datavideo = () => {
  const videoUrl = useSelector((state: RootState) => state.video.url);
  console.log(videoUrl);
  const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    width: 950,
    height: 820,
    fluid: true,
    sources: [
      {
        src: videoUrl,
        type: "application/x-mpegURL",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  return (
    <>
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
    </>
  );
};

export default Datavideo;
