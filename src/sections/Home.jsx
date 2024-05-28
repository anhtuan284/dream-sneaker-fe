import React from "react";
import PopularProducts from "./LandingPage/PopularProducts";
import ProductList from "./LandingPage/ProductList";
import { Nav } from "../components";

const Home = (props) => {
  return (
    <>
      <Nav />
      <section className="padding">
        <ProductList />
      </section>
    </>
  );
};

export default Home;
