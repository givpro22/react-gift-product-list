import { apiClient } from "./client";

export interface ThemeType {
  themeId: number;
  name: string;
  image: string;
}

export interface ThemeProduct {
  id: number;
  name: string;
  price: {
    basicPrice: number;
    sellingPrice: number;
    discountRate: number;
  };
  imageURL: string;
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
}

export interface ThemeProductResponse {
  list: ThemeProduct[];
  cursor: number;
  hasMoreList: boolean;
}

export interface ThemeInfo {
  themeId: number;
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
}

export async function fetchThemes(): Promise<ThemeType[]> {
  const response = await apiClient.get("/api/themes");
  return response.data.data;
}

export async function fetchThemeProducts(
  themeId: string,
  cursor: number = 0,
  limit: number = 10
): Promise<ThemeProductResponse> {
  const response = await apiClient.get(`/api/themes/${themeId}/products`, {
    params: { cursor, limit },
  });
  return response.data.data;
}

export async function fetchThemeInfo(themeId: string): Promise<ThemeInfo> {
  const response = await apiClient.get(`/api/themes/${themeId}/info`);
  return response.data.data;
}
