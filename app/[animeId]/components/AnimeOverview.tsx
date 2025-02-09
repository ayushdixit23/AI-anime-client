
"use client"
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import Link from "next/link";


type Anime = {
  _id: string;
  animeId: string;
  animeName: string;
  description: string;
  animeImage: string;
  genre: string[];
  animeVideo: string[];
  moreSeasons: string[];
  rating: number;
  animeType: 'TV' | 'Movie' | 'OVA' | 'Special'; // Assuming possible types
  quality: 'HD' | 'SD'; // Assuming possible qualities
  __v: number;
};

const AnimeOverview = ({ anime }: { anime: Anime }) => {

  return (
    <div className="max-w-6xl bg-[#0d0d0d] mx-auto p-6 space-y-6">
      {/* <Card className="flex flex-col md:flex-row bg-gray-900 text-white p-4 rounded-xl shadow-lg"> */}
      <Card className="flex flex-col md:flex-row bg-white/10 backdrop-blur-lg border border-white/20 text-white p-4 rounded-xl shadow-lg">

        <img
          src={anime.animeImage}
          alt={anime.animeName}
          className="w-full sm:w-[400px] object-cover rounded-lg shadow-md"
        />
        <CardContent className="flex flex-col p-4 space-y-4">
          <div>
            <h1 className="text-3xl font-bold">{anime.animeName}</h1>

            <p className="mt-2 text-gray-300 leading-relaxed text-sm">{anime.description}</p>
          </div>
          <div className="flex w-full gap-3 items-center">
            <span className="text-sm font-medium text-gray-300">Genre:</span>

            <div className="flex gap-2 text-xs flex-wrap">
              {anime.genre.map((d, index) => (
                <span
                  key={index}
                  className="border border-white/50 bg-white/10 text-white px-3 py-1.5 rounded-full shadow-sm backdrop-blur-md"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Link href={`/anime/${anime.animeId}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}

              className=" bg-white flex justify-center items-center gap-2 text-black py-2 px-6 rounded-2xl font-semibold shadow-md"
              type="submit"
            >
              <FaPlay className="text-sm" />
              Watch Now
            </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}

              className=" bg-white flex justify-center items-center gap-2 text-black py-2 px-6 rounded-2xl font-semibold shadow-md"
              type="submit"
            >
              <GoPlus className="text-xl font-extrabold" />
              Add To List
            </motion.button>

          </div>
          <div className="flex items-center gap-4 text-gray-300">
            <span>23 August 2003</span>
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500" /> {anime.rating}
            </span>
            <span>{anime.animeVideo.length} Episodes</span>
          </div>
        </CardContent>
      </Card>

    </div>
  );
};

export default AnimeOverview;
