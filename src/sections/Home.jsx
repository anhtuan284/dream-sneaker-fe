import React from "react";
import PopularProducts from "./LandingPage/PopularProducts";
import ProductList from "./LandingPage/ProductList";

const Home = (props) => {
  return (
    <>
      <section className="padding">
        <ProductList />
      </section>
    </>
  );
};

export default Home;
