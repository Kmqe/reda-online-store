import { useEffect, useState } from "react";
import { IoMdMenu, IoMdArrowDropdown } from "react-icons/io";
import { PiSignInBold } from "react-icons/pi";
import { FaUserPlus } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { title: "Home", link: "/" },
  { title: "About", link: "/about" },
  { title: "Accessories", link: "/accessories" },
  { title: "Blog", link: "/blog" },
  { title: "Contact", link: "/contact" },
];

const BtmHeader = () => {
  const location = useLocation();
  const [categories, setCategories] = useState([]);

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  useEffect(() => {
    setIsCategoryOpen(false);
  }, [location]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://dummyjson.com/products/categories");
      const data = await response.json();
      setCategories(data);
    };
    fetchData();
  }, []);

  return (
    <div className="btm_header">
      <div className="container">
        <nav className="nav">
          <div className="category_nav">
            <div
              className="category_btn"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            >
              <IoMdMenu />
              <p>Browse Category</p>
              <IoMdArrowDropdown />
            </div>

            <div
              className={`category_nav_list ${isCategoryOpen ? "active" : " "}`}
            >
              {categories.map((category, index) => (
                <Link to={`/category/${category.slug}`} key={index + 1}>
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="nav_links">
            {navLinks.map((item) => (
              <li
                key={item.link}
                className={location.pathname === item.link ? "active" : ""}
              >
                <Link to={item.link}>{item.title}</Link>
              </li>
            ))}
          </div>
        </nav>

        <div className="sign_regs_icon">
          <Link to={"/"}>
            <PiSignInBold />
          </Link>
          <Link to={"/"}>
            <FaUserPlus />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BtmHeader;
