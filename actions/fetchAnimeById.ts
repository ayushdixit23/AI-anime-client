import axios from "axios";

const fetchAnimeById = async (animeId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:2422/api/anime/${animeId}`
    );
    if (!response.data) {
      throw new Error("failed to get anime");
    }
    return response.data;
  } catch (error) {
    let errorMessage = "An error occurred while fetching anime";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.log(errorMessage);
    throw new Error(errorMessage);
  }
};

export default fetchAnimeById;
