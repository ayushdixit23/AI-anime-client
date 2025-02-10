import React from "react";
import Animedata from "./Animedata";
import Videolist from "./Videolist";
import fetchVideosById from "@/actions/fetchVideosById";

import Datavideo from "./videoPlayer/Datavideo";

const Clientanime = async ({ anidata }) => {
  const videoData = await fetchVideosById(anidata.anime.animeId);

  return (
    <div className="flex">
      <Videolist videodata={videoData} />
      <Datavideo />
      <Animedata data={anidata} />
    </div>
  );
};

export default Clientanime;
