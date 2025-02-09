import React from "react";
import { API } from "./utils/constants";
import HomePage from "@/components/HomePage";

const Page = async () => {
  const res = await fetch(`${API}/getAllAnimes`);
  const data = await res.json();

  console.log(data,"data")

  return (
    <HomePage animes={data.anime} />
  );
};

export default Page;