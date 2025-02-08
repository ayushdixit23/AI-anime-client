"use client";
import React from "react";
import Image from "next/image";
import Expandtext from "./customizable-components/Expandtext";

const Animedata = ({ data }) => {
  //   const fixedImageUrl = data?.anime?.animeImage?.replace(
  //     /(cloudfront\.net)(\d)/,
  //     "$1/$2"
  //   );

  return (
    <>
      <div className="bg-r w-1/3 h-[80vh] space-y-4 p-4">
        <Image
          src={data.anime.animeImage || ""}
          width={180}
          height={80}
          alt={data.anime.animeImage}
          className="mb-4"
        />

        <h1 className="text-white font-sans text-2xl font-bold">
          {data?.anime?.animeName}
        </h1>

        <div className="flex space-x-2">
          <h2 className="text-white bg-pink-300 w-6 rounded-sm font-sans">
            {data?.anime?.animeType}
          </h2>
          <h2 className="text-white bg-pink-300 w-6 rounded-sm font-sans">
            {data?.anime?.quality}
          </h2>
        </div>

        <div className="h-48 overflow-y-auto font-sans">
          <Expandtext>{data?.anime?.description}</Expandtext>
        </div>
      </div>
    </>
  );
};

export default Animedata;
