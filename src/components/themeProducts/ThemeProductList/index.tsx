import { fetchThemeProducts, type ThemeProduct } from "@/api/themes";
import { useCallback, useEffect, useRef, useState } from "react";
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
import NotFoundPage from "@/pages/NotFoundPage";

function ThemeProductList() {
  const { themeId } = useParams<{ themeId: string }>();
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<ThemeProduct[]>([]);
  const [cursor, setCursor] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const loadMoreProducts = useCallback(async () => {
    if (!themeId || !hasMore || isFetching) return;

    setIsFetching(true);
    try {
      const data = await fetchThemeProducts(themeId, cursor);
      setProducts((prev) => {
        const existingIds = new Set(prev.map((item) => item.id));
        const newItems = data.list.filter((item) => !existingIds.has(item.id));
        return [...prev, ...newItems];
      });
      setCursor(data.cursor);
      setHasMore(data.hasMoreList);
    } catch {
      setError("테마제품 정보를 불러오는 데 실패했습니다.");
    } finally {
      setIsFetching(false);
    }
  }, [themeId, hasMore, isFetching, cursor]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore) {
          loadMoreProducts();
        }
      },
      { threshold: 1.0 }
    );

    const currentElement = observerRef.current;
    if (currentElement) observer.observe(currentElement);
    return () => {
      if (currentElement) observer.unobserve(currentElement);
    };
  }, [hasMore, loadMoreProducts]);

  if (error) {
    return <NotFoundPage />;
  }
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
      {hasMore && <div ref={observerRef} style={{ height: 1 }} />}
    </section>
  );
}

export default ThemeProductList;
