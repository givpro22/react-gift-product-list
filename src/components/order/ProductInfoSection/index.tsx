import { useParams } from "react-router-dom";
import { whiteSectionStyle } from "@/styles/CommonStyles";
import {
  titleStyle,
  cardStyle,
  imageStyle,
  nameStyle,
  brandStyle,
  priceStyle,
  priceValueStyle,
} from "./styles";
import { useEffect, useState } from "react";
import { useOrder } from "@/contexts/OrderContext";
import { fetchProductSummary, type ProductSummary } from "@/api/products";

function ProductInfoSection() {
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductSummary | null>(null);

  const { setProductPrice, setProductName } = useOrder();

  useEffect(() => {
    if (!productId) return;
    fetchProductSummary(productId).then((data) => {
      setProduct(data);
    });
  }, [productId]);

  useEffect(() => {
    if (product) {
      setProductPrice(product.price);
      setProductName(product.name);
    }
  }, [product, setProductName, setProductPrice]);

  if (!product) return null;

  return (
    <div css={whiteSectionStyle()}>
      <h3 css={titleStyle}>상품 정보</h3>
      <div css={cardStyle}>
        <img src={product.imageURL} alt={product.name} css={imageStyle} />
        <div>
          <div css={nameStyle}>{product.name}</div>
          <div css={brandStyle}>{product.brandName}</div>
          <div css={priceStyle}>
            상품가{" "}
            <span css={priceValueStyle}>
              {product.price.toLocaleString()}원
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductInfoSection;
