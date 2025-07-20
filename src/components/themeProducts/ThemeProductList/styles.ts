import { css } from "@emotion/react";

export const sectionStyle = css`
  padding: 24px;
`;

export const gridStyle = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 20px;
`;

export const cardStyle = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const imageStyle = css`
  width: 100%;
  border-radius: 8px;
`;

export const brandStyle = css`
  font-size: 12px;
  color: #888;
`;

export const nameStyle = css`
  font-size: 14px;
  font-weight: 500;
`;

export const priceStyle = css`
  font-size: 15px;
  font-weight: 700;
`;
