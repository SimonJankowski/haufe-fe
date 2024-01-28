import { client } from "./base";

export const fetchCharacterDetails = async (id) => {
  try {
    const response = await client.get(`/api/characters/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching character details:", error);
    throw error;
  }
};

export const fetchCharacters = async (page) => {
  try {
    const response = await client.get(`/api/characters?page=${page}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw error;
  }
};
