import type { SerializedStyles } from "@emotion/react";

type LoadingPageProps = {
  css: SerializedStyles;
};

function LoadingPage({ css }: LoadingPageProps) {
  return <div css={css}>로딩 중...</div>;
}

export default LoadingPage;
