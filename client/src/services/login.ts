import { SERVER_URL } from "../../src/config/config";

export const loginService = async (credentials: { username: string; password: string }) => {
  const response = await fetch(SERVER_URL + "/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  return response.json();
};
