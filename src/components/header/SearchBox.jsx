import React, { useEffect, useState } from "react";
import { FaSearch, FaRegHeart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [serachTerm, setSerachTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const navigate = useNavigate();

  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (serachTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(serachTerm.trim())}`);
    }

    setSuggestions([]);
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!serachTerm.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${serachTerm}`
        );
        const data = await res.json();
        setSuggestions(data.products.slice(0, 5) || []);
      } catch (error) {
        console.log(`Search Error :`, error);
        setSuggestions([]);
      }
    };

    const debonuce = setTimeout(() => {
      fetchSuggestions();
    }, 400);

    return () => clearTimeout(debonuce);
  }, [serachTerm]);

  useEffect(() => {
    setSuggestions([]);
    setSerachTerm("");
  }, [location]);

  return (
    <div className="serachBox_container">
      <form onSubmit={handleSubmit} className="search_box">
        <input
          onChange={(e) => setSerachTerm(e.target.value)}
          value={serachTerm}
          type="text"
          name="search"
          id="search"
          placeholder="Search For Products"
          autoComplete="off"
        />
        <button type="submit">
          <FaSearch />
        </button>
      </form>

      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((item) => (
            <Link to={`/products/${item.id}`} key={item.id}>
              <li>
                <img src={item.images[0]} alt="" /> <span>{item.title}</span>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
