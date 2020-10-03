import React, { useEffect, useState } from "react";
import "./Home.style.css";
import { Link } from "react-router-dom";
import axios from "../../axios";

function Home() {
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchedText, setSearchText] = useState("");
  const classes = [
    "bg-primary",
    "bg-secondary",
    "bg-info",
    "bg-warning",
    "bg-danger",
    "bg-success",
  ];

  useEffect(() => {
    axios
      .get("/api/categories/all")
      .then((response) => {
        setCategories(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => alert(error.message));
  }, []);

  useEffect(() => {
    setFilteredProducts(
      categories.filter((category) =>
        category.name.toLowerCase().includes(searchedText.trim().toLowerCase())
      )
    );
  }, [searchedText]);

  return (
    <div className="container home py-5 text-center">
      <h3>I GROW BY HELPING PEOPLE</h3>
      <input
        type="text"
        value={searchedText}
        onChange={(e) => setSearchText(e.target.value)}
        className="home__search"
        placeholder="Search Category"
      />

      <div className="row my-4">
        {filteredProducts.map((category, index) => (
          <div
            className="col-lg-3 col-md-4 col-sm-6 my-3 home__categories"
            key={category._id}
          >
            <Link to={`/addwork/${category._id}`}>
              <div
                className={`category__card ${
                  classes[Math.floor(Math.random() * 6)]
                }`}
              >
                <img src={category.img} alt="" />
                <h5 className="py-2">{category.name}</h5>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
