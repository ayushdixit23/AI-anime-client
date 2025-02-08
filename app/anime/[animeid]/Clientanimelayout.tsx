import React from "react";
import Animedata from "./Animedata";
import Videolist from "./Videolist";
import fetchVideosById from "@/actions/fetchVideosById";
import Anivideoplayer from "./videoPlayer/Anivideoplayer";
{
  /* <Animedata data={anidata} />; */
  // anime-video-player
}

const Clientanime = async ({ anidata }) => {
  const videoData = await fetchVideosById(anidata.anime.animeId);

  return (
    <div className="flex">
      <Videolist videodata={videoData} />
      <Anivideoplayer />
      <Animedata data={anidata} />
    </div>
  );
};

export default Clientanime;
