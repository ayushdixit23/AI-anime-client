import React from "react";

const Video = ({ data }) => {
  return (
    <div className="bg-gray-600 text-white w-10 h-8 text-center rounded-sm hover:bg-slate-400 transition duration-300 ">
      {data.EpisodeNo}
    </div>
  );
};

export default Video;
