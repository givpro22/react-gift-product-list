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

export async function fetchOrderApi(
  order: OrderRequest
): Promise<{ success: boolean }> {
  const response = await apiClient.post("/api/order", order);
  return response.data.data;
}
