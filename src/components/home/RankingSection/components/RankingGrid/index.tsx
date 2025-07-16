import { useTheme } from "@emotion/react";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  gridStyle,
  itemStyle,
  rankStyle,
  imageStyle,
  nameStyle,
  emptyResultsStyle,
  loadingContainerStyle,
} from "./styles";
import { useAuth } from "@/contexts/AuthContext";
import { fetchRankingProducts, type Product } from "@/api/products";
import LoadingPage from "@/pages/LoadingPage";

export default function RankingGrid() {
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const mainFilter = searchParams.get("main");
  const subFilter = searchParams.get("sub");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchRankingProducts({ mainFilter, subFilter });
        setProducts(result);
      } catch {
        setError("상품 랭킹을 불러오는 데 실패했습니다.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [mainFilter, subFilter]);

  const handleItemClick = (id: number) => {
    if (user) {
      navigate(`/order/${id}`);
    } else {
      navigate("/login", { state: { from: `/order/${id}` } });
    }
  };

  if (loading) {
    return <LoadingPage css={loadingContainerStyle(theme)} />;
  }

  if (error) {
    return (
      <div css={emptyResultsStyle(theme)}>
        <p>{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div css={emptyResultsStyle(theme)}>
        <p>선물 랭킹 상품이 없습니다</p>
      </div>
    );
  }

  return (
    <div css={gridStyle(theme)}>
      {products.map((item, index) => (
        <div
          key={item.id}
          css={itemStyle}
          onClick={() => handleItemClick(item.id)}
        >
          <div css={rankStyle(theme)}>{index + 1}</div>
          <img src={item.imageURL} alt={item.name} css={imageStyle} />
          <div css={nameStyle(theme)}>{item.name}</div>
        </div>
      ))}
    </div>
  );
}
