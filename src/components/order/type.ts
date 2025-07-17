import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

export interface Receiver {
  name: string;
  phone: string;
  quantity: number;
}

export type FormValues = {
  message: string;
  sender: string;
  receivers: Receiver[];
};

export type GiftMessageSectionProps = {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  selectedCardId: string;
  setSelectedCardId: React.Dispatch<React.SetStateAction<string>>;
};

export type SenderSectionProps = {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
};
