import fetchAnimeById from "@/actions/fetchAnimeById";
import Clientanime from "./Clientanime";

const Page = async ({ params }) => {
  const { animeid } = await params;
  const data = await fetchAnimeById(animeid);

  return <Clientanime anidata={data} />;
};

export default Page;
