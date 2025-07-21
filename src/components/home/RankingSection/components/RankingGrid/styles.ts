import { css } from "@emotion/react";
import type { Theme } from "@emotion/react";

export const gridStyle = (theme: Theme) => css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.spacing4};
  padding: ${theme.spacing.spacing6} ${theme.spacing.spacing4};
`;

export const itemStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
`;

export const rankStyle = (theme: Theme) => css`
  font-weight: bold;
  font-size: ${theme.fontSizes.label1Bold};
  background-color: ${theme.colors.gray.gray200};
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
`;

export const imageStyle = css`
  width: 100%;
  height: 100%;
  margin-bottom: 6px;
`;

export const nameStyle = (theme: Theme) => css`
  font-size: ${theme.fontSizes.label1Regular};
`;

export const loadingContainerStyle = (theme: Theme) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px; /* 필요에 따라 조정 */
  font-size: 1.2rem;
  color: ${theme.colors.brown}; /* 또는 색상 조정 */
`;

export const emptyResultsStyle = (theme: Theme) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px; /* 필요에 따라 조정 */
  font-size: 1.2rem;
  color: ${theme.colors.brown}; /* 또는 색상 조정 */
  text-align: center;
`;
