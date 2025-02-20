import { Request, Response } from "express";
import axios from "axios";

// Token management
let accessToken: string | null = null;
let tokenExpiration = 0;

async function getToken(): Promise<string> {
  if (accessToken && tokenExpiration > Date.now()) {
    return accessToken;
  }

  try {
    const response = await axios({
      method: "post",
      url: "https://oauth.fatsecret.com/connect/token",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      auth: {
        username: process.env.FATSECRET_CLIENT_ID || "",
        password: process.env.FATSECRET_CLIENT_SECRET || "",
      },
      data: "grant_type=client_credentials&scope=basic",
    });

    console.log(response);
    accessToken = response.data.access_token;
    tokenExpiration = Date.now() + response.data.expires_in * 1000 - 60000;

    if (!accessToken) {
      throw new Error("Failed to obtain access token: Token is null");
    }

    return accessToken;
  } catch (error: any) {
    console.error("Token error:", error.response?.data || error.message);
    throw new Error("Failed to get access token");
  }
}

// Search for foods
export const searchFoods = async (req: Request, res: Response) => {
  try {
    const token = await getToken();
    const searchQuery = req.query.search_expression as string;

    if (!searchQuery) {
      return res.status(400).json({ error: "Search query is required" });
    }

    const response = await axios({
      method: "get",
      url: "https://platform.fatsecret.com/rest/server.api",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        method: "foods.search",
        search_expression: searchQuery,
        format: "json",
      },
    });

    res.json(response.data);
  } catch (error: any) {
    console.error("API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to search foods" });
  }
};
