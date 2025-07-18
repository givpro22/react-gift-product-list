import { apiClient } from "./client";

export interface ThemeType {
  themeId: number;
  name: string;
  image: string;
}

export async function fetchThemes(): Promise<ThemeType[]> {
  const response = await apiClient.get("/api/themes");
  return response.data.data;
}
