import { fetchThemeProducts, type ThemeProductResponse } from "@/api/themes";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  sectionStyle,
  gridStyle,
  cardStyle,
  imageStyle,
  brandStyle,
  nameStyle,
  priceStyle,
} from "./styles";

function ThemeProductList() {
  const { themeId } = useParams<{ themeId: string }>();
  const [themes, setThemes] = useState<ThemeProductResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!themeId) return;

    const loadThemeProductoData = async () => {
      try {
        const data = await fetchThemeProducts(themeId);
        setThemes(data);
      } catch {
        setError("테마제품 정보를 불러오는 데 실패했습니다.");
      }
      setLoading(false);
    };
    loadThemeProductoData();
  }, [themeId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!themes || !themes.list || themes.list.length === 0)
    return <div>상품이 없습니다.</div>;

  const products = themes.list;

  return (
    <section css={sectionStyle}>
      <div css={gridStyle}>
        {products.map((item) => (
          <div key={item.id} css={cardStyle}>
            <img src={item.imageURL} alt={item.name} css={imageStyle} />
            <div css={brandStyle}>{item.brandInfo.name}</div>
            <div css={nameStyle}>{item.name}</div>
            <div css={priceStyle}>
              {item.price.sellingPrice.toLocaleString()} 원
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ThemeProductList;
