import fetchAnimeById from "@/actions/fetchAnimeById";
import Clientanime from "./Clientanime";

interface Params {
  animeid: string;
}

interface PageProps {
  params: Params;
}

const Page = async ({ params }: PageProps) => {
  const { animeid } = params;
  const data = await fetchAnimeById(animeid);

  return <Clientanime anidata={data} />;
};

export default Page;
