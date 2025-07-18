import { apiClient } from "./client";

export interface Receiver {
  name: string;
  phoneNumber: string;
  quantity: number;
}

export interface OrderRequest {
  productId: number;
  message: string;
  messageCardId: string;
  ordererName: string;
  receivers: Receiver[];
}

export async function createOrder(
  order: OrderRequest
): Promise<{ success: boolean }> {
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo") || "{}");
  const token = userInfo.authToken;
  const response = await apiClient.post("/api/order", order, {
    headers: {
      Authorization: `${token}`,
    },
  });
  return response.data.data;
}
