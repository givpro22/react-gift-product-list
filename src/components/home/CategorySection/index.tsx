import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import {
  titleStyle,
  gridStyle,
  itemStyle,
  imageStyle,
  nameStyle,
} from "./styles";
import { whiteSectionStyle } from "@/styles/CommonStyles";
import { fetchThemes, type ThemeType } from "@/api/themes";
import LoadingPage from "@/pages/LoadingPage";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function CategorySection() {
  const theme = useTheme();
  const [themes, setThemes] = useState<ThemeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { user } = useAuth();

  const handleItemClick = (themeId: number) => {
    if (user) {
      navigate(`/themes/${themeId}`);
    } else {
      navigate("/login", { state: { from: `/themes/${themeId}` } });
    }
  };

  useEffect(() => {
    const loadThemes = async () => {
      try {
        const data = await fetchThemes();
        setThemes(data);
      } catch {
        setError("불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    loadThemes();
  }, []);

  if (loading) return <LoadingPage css={whiteSectionStyle()} />;
  if (error || themes.length === 0) return null;

  return (
    <div css={whiteSectionStyle()}>
      <h2 css={titleStyle(theme)}>선물 테마</h2>
      <div css={gridStyle}>
        {themes.map((item) => (
          <div
            key={item.themeId}
            css={itemStyle}
            onClick={() => handleItemClick(item.themeId)}
          >
            <img src={item.image} alt={item.name} css={imageStyle} />
            <span css={nameStyle(theme)}>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
