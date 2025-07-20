import { fetchThemeInfo, type ThemeInfo } from "@/api/themes";
import LoadingPage from "@/pages/LoadingPage";
import { whiteSectionStyle } from "@/styles/CommonStyles";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  sectionStyle,
  nameStyle,
  titleStyle,
  descriptionStyle,
} from "./styles";
import type { AxiosError } from "axios";

function ThemeHeroSection() {
  const { themeId } = useParams<{ themeId: string }>();
  const [themesInfo, setThemesInfo] = useState<ThemeInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!themeId) return;

    const loadThemeHeroData = async () => {
      try {
        const data = await fetchThemeInfo(themeId);
        setThemesInfo(data);
      } catch (error: unknown) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 404) {
          navigate("/home");
        } else {
          setError("테마 상품 정보를 불러오는 데 실패했습니다.");
        }
      }
      setLoading(false);
    };
    loadThemeHeroData();
  }, [themeId, navigate]);
  if (!themesInfo) return null;
  if (loading) return <LoadingPage css={whiteSectionStyle()} />;
  if (error) return null;

  return (
    <section css={sectionStyle(themesInfo.backgroundColor)}>
      <p css={nameStyle}>{themesInfo.name}</p>
      <h2 css={titleStyle}>{themesInfo.title}</h2>
      <p css={descriptionStyle}>{themesInfo.description}</p>
    </section>
  );
}

export default ThemeHeroSection;
