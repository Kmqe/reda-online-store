import "./productDetails.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SlideProduct from "../../components/slideProducts/SlideProduct";
import ProductDetailsLoading from "./ProductDetailsLoading";
import SlideProductLoading from "./SlideProductLoading";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import PageTransition from "../../components/PageTransition";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loadingRelatedProducts, setLoadingRelatedProducts] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.log(`fetching error ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!product) return;
    fetch(`https://dummyjson.com/products/category/${product.category}`)
      .then((res) => res.json())
      .then((data) => {
        setRelatedProducts(data.products);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoadingRelatedProducts(false));
  }, [product?.category]);

  if (!product) return <p>Product not found</p>;

  return (
    <PageTransition key={id}>
      <div>
        {loading ? (
          <ProductDetailsLoading />
        ) : (
          <div className="item_details">
            <div className="container">
              <ProductImages product={product} />
              <ProductInfo product={product} />
            </div>
          </div>
        )}

        {loadingRelatedProducts ? (
          <SlideProductLoading />
        ) : (
          <SlideProduct
            key={product.category}
            title={product.category}
            data={relatedProducts}
          />
        )}
      </div>
    </PageTransition>
  );
};

export default ProductDetails;
