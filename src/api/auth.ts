import { apiClient } from "./client";

export async function loginApi(
  email: string,
  password: string
): Promise<{ authToken: string; email: string; name: string }> {
  const response = await apiClient.post("/api/login", { email, password });
  return response.data.data;
}
export async function logoutApi(): Promise<void> {
  await apiClient.post("/logout");
}
