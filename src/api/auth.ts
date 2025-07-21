import { apiClient } from "./client";

export interface UserInfo {
  authToken: string;
  email: string;
  name: string;
}
export async function fetchLoginApi(email: string, password: string) {
  const response = await apiClient.post<{ data: UserInfo }>("/api/login", {
    email,
    password,
  });
  return response.data.data;
}
