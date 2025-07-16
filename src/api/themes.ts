import { apiClient } from "./client";

export interface ThemProp {
  themeId: number;
  name: string;
  image: string;
}

export async function fetchThemes(): Promise<ThemProp[]> {
  const response = await apiClient.get("/api/themes");
  return response.data.data;
}
