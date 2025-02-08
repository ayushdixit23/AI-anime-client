import axios from "axios";

const fetchVideosById = async (animeId: string) => {
  try {
    const response = await axios.get(
      ` http://localhost:2422/api/getAllEpisodes/${animeId}`
    );

    if (!response.data) {
      throw new Error("Anime videos not found");
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Extract error message from API response
        const apiMessage = error.response.data?.message || "Request failed"; // error from response send by server

        throw new Error(apiMessage);
      } else if (error.request) {
        throw new Error("No response from server. Please try again later.");
      } else {
        throw new Error(error.message);
      }
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export default fetchVideosById;
