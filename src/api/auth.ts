import { apiClient } from "./client";

interface LoginAPIResponse {
  authToken: string;
  email: string;
  name: string;
}
export async function loginApi(email: string, password: string) {
  const response = await apiClient.post<{ data: LoginAPIResponse }>(
    "/api/login",
    {
      email,
      password,
    }
  );
  return response.data.data;
}
