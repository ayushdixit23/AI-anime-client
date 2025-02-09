import React from "react";
import Animedata from "./Animedata";
import Videolist from "./Videolist";
import fetchVideosById from "@/actions/fetchVideosById";
import Anivideoplayer from "./videoPlayer/Anivideoplayer";
import Videoplayclient from "./Videoplayclient";

// <Anivideoplayer videoUrl={videoUrl} />

const Clientanime = async ({ anidata }) => {
  const videoData = await fetchVideosById(anidata.anime.animeId);

  const videoUrl =
    "https://ddr8m0gdhyi51.cloudfront.net/death-note-8615/1738676496209_89b101c6-c142-4b9e-b8f9-e15dee255b23_Rebirth/index.m3u8";

  return (
    <div className="flex">
      <Videolist videodata={videoData} />
      <Videoplayclient />
      <Animedata data={anidata} />
    </div>
  );
};

export default Clientanime;
