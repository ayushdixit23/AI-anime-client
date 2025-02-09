"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import Anivideoplayer from "./videoPlayer/Anivideoplayer";

const Videoplayclient = () => {
  const videoUrl = useSelector((state: RootState) => state.video.url);

  const completeUrl = `https://ddr8m0gdhyi51.cloudfront.net/${videoUrl}`;

  return (
    <div className=" bg-gray-900">
      <Anivideoplayer videoUrl={completeUrl} />
    </div>
  );
};

export default Videoplayclient;
