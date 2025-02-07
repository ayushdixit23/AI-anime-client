"use client";
import React, { useState } from "react";
import Image from "next/image";
import Expandtext from "./customizable-components/Expandtext";

const Animedata = ({ data }) => {
  const fixedImageUrl = data?.anime?.animeImage?.replace(
    /(cloudfront\.net)(\d)/,
    "$1/$2"
  );
  return (
    <>
      <div className="bg-r w-1/3 h-1/2 space-y-4">
        <Image
          src={fixedImageUrl || ""}
          width={180}
          height={80}
          alt={data.anime.animeName}
        />
        <h1 className="text-white">{data.anime.animeName}</h1>
        <div>
          <Expandtext>{data?.anime?.description}</Expandtext>
        </div>
      </div>
    </>
  );
};

export default Animedata;
