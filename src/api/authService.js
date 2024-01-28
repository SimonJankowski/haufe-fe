import { client } from "../api/base.js";

export const login = async (email, password) => {
  const response = await client.post("/api/auth/login", {
    email,
    password: password,
  });

  return response.data;
};

export const register = async (username, email, password) => {
  const response = await client.post("/api/auth/register", {
    username,
    email,
    password,
  });
  return response.data;
};
