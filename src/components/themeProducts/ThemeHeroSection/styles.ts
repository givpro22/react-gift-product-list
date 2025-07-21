import { css } from "@emotion/react";

export const sectionStyle = (backgroundColor: string) => css`
  background-color: ${backgroundColor};
  color: #fff;
  padding: 40px 24px;
`;

export const nameStyle = css`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const titleStyle = css`
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 12px;
`;

export const descriptionStyle = css`
  font-size: 16px;
  font-weight: 400;
`;
