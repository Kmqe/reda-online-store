import BtmHeader from "./components/header/BtmHeader";
import TopHeader from "./components/header/TopHeader";
import Home from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProductDetails from "./pages/productDetails/ProductDetails";
import Cart from "./pages/cart/Cart";
import ScrollToTop from "./components/ScrollToTop";
import { AnimatePresence } from "framer-motion";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import SearchResult from "./pages/SearchResult";
import Favorites from "./pages/favorites/Favorites";

function App() {
  return (
    <>
      <header>
        <TopHeader />
        <BtmHeader />
      </header>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#e9e9e9",
            borderRadius: "5px",
            padding: "14px",
          },
        }}
      />
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/category/:category" element={<CategoryPage />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

// 16 - 24:00

export default App;
