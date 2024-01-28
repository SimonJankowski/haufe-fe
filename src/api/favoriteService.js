import { client } from "./base";
export const addToFavorites = async (userId, characterId) => {
  try {
    const response = await client.post("/api/favorites/add", {
      userId,
      characterId,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error adding to favorites"
    );
  }
};

export const removeFromFavorites = async (userId, characterId) => {
  try {
    const response = await client.post("/api/favorites/remove", {
      userId,
      characterId,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error removing from favorites"
    );
  }
};
