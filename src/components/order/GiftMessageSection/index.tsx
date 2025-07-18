import { cardData } from "@/mocks/orderCardData";
import { whiteSectionStyle } from "@/styles/CommonStyles";
import {
  cardListStyle,
  infoTextStyle,
  selectedCardStyle,
  messageInputStyle,
  cardThumbnailStyle,
  selectedCardImageStyle,
} from "./styles";
import type { GiftMessageSectionProps } from "../type";

const GiftMessageSection = ({
  register,
  errors,
  setValue,
  selectedCardId,
  setSelectedCardId,
}: GiftMessageSectionProps) => {
  const selectedCard = cardData.find(
    (card) => card.id === Number(selectedCardId)
  );

  return (
    <div css={whiteSectionStyle()}>
      <div css={cardListStyle}>
        {cardData.map((card) => (
          <img
            key={card.id}
            src={card.thumbUrl}
            alt="card thumbnail"
            onClick={() => {
              setSelectedCardId(String(card.id));
              setValue("message", card.defaultTextMessage);
            }}
            css={cardThumbnailStyle(card.id === Number(selectedCardId))}
          />
        ))}
      </div>

      {selectedCard && (
        <div css={selectedCardStyle}>
          <img
            src={selectedCard.imageUrl}
            alt="selected card"
            css={selectedCardImageStyle}
          />
        </div>
      )}

      <textarea
        placeholder="메시지를 입력해주세요"
        {...register("message", { required: "메시지를 입력해주세요." })}
        css={messageInputStyle}
      />
      {errors.message && (
        <p css={infoTextStyle} style={{ color: "red" }}>
          {errors.message.message}{" "}
        </p>
      )}
    </div>
  );
};

export default GiftMessageSection;
