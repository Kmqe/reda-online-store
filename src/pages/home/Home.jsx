import "./home.css";
import HeroSlider from "../../components/HeroSlider";
import SlideProduct from "../../components/slideProducts/SlideProduct";
import { useEffect, useState } from "react";
import SlideProductLoading from "../productDetails/SlideProductLoading";
import PageTransition from "../../components/PageTransition";

const categories = [
  "smartphones",
  "mobile-accessories",
  "laptops",
  "tablets",
  "sports-accessories",
  "sunglasses",
];

const Home = () => {
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const results = await Promise.all(
          categories.map(async (category) => {
            const res = await fetch(
              `https://dummyjson.com/products/category/${category}`
            );
            const data = await res.json();
            return { [category]: data.products };
          })
        );

        const productsData = Object.assign({}, ...results);
        setProducts(productsData);
      } catch (error) {
        console.log("Error Fetching", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <PageTransition>
      <div>
        <HeroSlider />

        {loading
          ? categories.map((category) => <SlideProductLoading key={category} />)
          : categories.map((category) => (
              <SlideProduct
                key={category}
                data={products[category]}
                title={category}
              />
            ))}
      </div>
    </PageTransition>
  );
};

export default Home;
