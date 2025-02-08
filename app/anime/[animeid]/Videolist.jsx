"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { FaChevronDown } from "react-icons/fa"; // Import the icon
import Video from "./Video";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

const Videolist = ({ videodata }) => {
  const videoData = videodata.anime.animeVideo;

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (videoData) {
      console.log(videoData);
      setVideos(videoData);
    }
  }, [videoData]);

  console.log(videos);

  return (
    <div className="w-1/5 bg-r h-[80vh] space-y-3 space-x-3 ">
      <h1 className="text-white ml-3 ">List of episodes:</h1>

      <div className="flex space-x-4 ">
        {videos.length > 10 && (
          <>
            <Input
              id="exampleInput"
              type="text"
              className="w-32 h-8 custom-input text-white"
              placeholder="Number of Ep"
            />
            <DropdownMenu>
              <DropdownMenuTrigger className="text-white h-3 flex">
                EPS:001-100
                <FaChevronDown className="ml-2 mt-1" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>001-100</DropdownMenuItem>
                <DropdownMenuItem>100-200</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>200-300</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
      <div className=" space-x-3 flex w-full h-full overflow-y-auto">
        {videos.map((video) => (
          <Video data={video} key={video.EpisodeNo} />
        ))}
      </div>
    </div>
  );
};

export default Videolist;
