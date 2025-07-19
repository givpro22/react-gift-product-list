import { HorizontalSpacing } from "@/components/common/Spacing/HorizontalSpacing";
import GiftMessageSection from "@/components/order/GiftMessageSection";
import ProductInfoSection from "@/components/order/ProductInfoSection";
import SenderSection from "@/components/order/SenderSection";
import ReceiverSection from "@/components/order/ReceiverSection";
import OrderSubmitBar from "@/components/order/OrderSubmitBar";
import { FormProvider, useForm } from "react-hook-form";
import type { FormValues } from "@/components/order/type";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useOrder } from "@/contexts/OrderContext";
import { useAuth } from "@/contexts/AuthContext";
import { cardData } from "@/mocks/orderCardData";
import type { AxiosError } from "axios";
import { fetchOrderApi } from "@/api/order";

function OrderPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const params = useParams();
  const { user } = useAuth();
  const { productName, quantity } = useOrder();
  const [selectedCardId, setSelectedCardId] = useState<string>(
    String(cardData[0].id)
  );
  const methods = useForm<FormValues>({
    mode: "onSubmit",
    defaultValues: {
      message: "",
      sender: user?.name || "",
      receivers: [{ name: "", phone: "", quantity: 1 }],
    },
  });
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = methods;
  const onSubmit = async (data: FormValues) => {
    try {
      await fetchOrderApi({
        productId: Number(params.productId),
        message: data.message,
        messageCardId: selectedCardId,
        ordererName: data.sender,
        receivers: data.receivers.map((r) => ({
          name: r.name,
          phoneNumber: r.phone,
          quantity: r.quantity,
        })),
      });
      alert(
        `주문이 완료되었습니다.\n` +
          `상품명: ${productName}\n` +
          `구매 수량: ${quantity}\n` +
          `발신자 이름: ${data.sender}\n` +
          `메시지: ${data.message}`
      );
      navigate("/");
    } catch (error: unknown) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === 401) {
        navigate("/login");
        return;
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <GiftMessageSection
          register={register}
          errors={errors}
          setValue={setValue}
          selectedCardId={selectedCardId}
          setSelectedCardId={setSelectedCardId}
        />
        <HorizontalSpacing size="spacing3" />
        <SenderSection register={register} errors={errors} />
        <HorizontalSpacing size="spacing3" />
        <ReceiverSection />
        <HorizontalSpacing size="spacing3" />
        <ProductInfoSection />
        <HorizontalSpacing size="spacing3" />
        <OrderSubmitBar formRef={formRef} />
      </form>
    </FormProvider>
  );
}

export default OrderPage;
