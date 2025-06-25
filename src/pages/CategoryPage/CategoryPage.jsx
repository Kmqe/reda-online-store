import "./categoryPage.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../../components/slideProducts/Product";
import SlideProductLoading from "../productDetails/SlideProductLoading";
import PageTransition from "../../components/PageTransition";

const CategoryPage = () => {
  const { category } = useParams();

  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/category/${category}`)
      .then((result) => result.json())
      .then((data) => setCategoryProducts(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <PageTransition>
      <div className="category_products">
        {loading ? (
          <SlideProductLoading />
        ) : (
          <div className="container">
            <div className="top_slide">
              <h2>
                {category} : {categoryProducts.limit}
              </h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Accusamus, tempore?
              </p>
            </div>

            <div className="products">
              {categoryProducts.products.map((item, index) => (
                <Product item={item} key={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default CategoryPage;
