import { fetchThemeInfo, type ThemeProductInfo } from "@/api/themes";
import LoadingPage from "@/pages/LoadingPage";
import { whiteSectionStyle } from "@/styles/CommonStyles";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  sectionStyle,
  nameStyle,
  titleStyle,
  descriptionStyle,
} from "./styles";

function ThemeHeroSection() {
  const { themeId } = useParams<{ themeId: string }>();
  const [themes, setThemes] = useState<ThemeProductInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!themeId) return;

    const loadThemeHeroData = async () => {
      try {
        const data = await fetchThemeInfo(themeId);
        setThemes(data);
      } catch {
        setError("테마 정보를 불러오는 데 실패했습니다.");
      }
      setLoading(false);
    };
    loadThemeHeroData();
  }, []);
  if (!themes) return null;
  if (loading) return <LoadingPage css={whiteSectionStyle()} />;
  if (error) return null;

  return (
    <section css={sectionStyle(themes.backgroundColor)}>
      <p css={nameStyle}>{themes.name}</p>
      <h2 css={titleStyle}>{themes.title}</h2>
      <p css={descriptionStyle}>{themes.description}</p>
    </section>
  );
}

export default ThemeHeroSection;
