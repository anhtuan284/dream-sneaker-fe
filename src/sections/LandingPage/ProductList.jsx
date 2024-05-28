import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import APIs, { endpoints } from "../../config/APIs";
import { PopularProductCard, SearchWithDropDown } from "../../components";
import Loader from "../../components/Loader";

const ProductList = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const pageSize = 8;

  const nav = useNavigate();
  const [q] = useSearchParams();
  const [catId, setCatId] = useState();
  const [kw, setKw] = useState();

  const loadProducts = async () => {
    setLoading(true);
    try {
      let url = `${endpoints["shoes"]}?Page=${page}&Size=${pageSize}`;

      if (catId) {
        setPage(1);
        setCatId(catId);
        url = `${url}&CategoryId=${catId}`;
      }

      if (kw) {
        setPage(1);
        setKw(kw);
        url = `${url}&Keyword=${kw}`;
      }

      console.info(url);
      const res = await APIs.get(url);

      setProducts(res.data.data);
      setTotalItems(res.data.count);
    } catch (ex) {
      console.error(ex);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [q, page, catId, kw]);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < Math.ceil(totalItems / pageSize)) {
      setPage(page + 1);
    }
  };

  return (
    <section id="products" className="max-container max-sm:mt-12 duration-150">
      <div className="flex flex-col justify-start gap-5">
        <h2 className="text-4xl font-palanquin font-bold">
          Our <span className="text-coral-red"> Popular </span> Products
        </h2>
        <p className="lg:max-w-lg mt-2 font-montserrat text-slate-gray">
          Experience top-notch quality and style with our sought-after
          selections. Discover a world of comfort, design, and value
        </p>
      </div>
      <SearchWithDropDown
        selectedId={catId}
        setSelectedId={setCatId}
        setKw={setKw}
      />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="mt-16 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-6 gap-14">
            {products.map((product) => (
              <PopularProductCard key={product.name} {...product} />
            ))}
          </div>
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={handlePreviousPage}
              disabled={page === 1}
              className={`px-4 py-2 text-white rounded ${
                page === 1
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-700"
              }`}
            >
              Previous
            </button>
            <span className="text-lg font-medium">{`Page ${page} of ${Math.ceil(
              totalItems / pageSize
            )}`}</span>
            <button
              onClick={handleNextPage}
              disabled={page === Math.ceil(totalItems / pageSize)}
              className={`px-4 py-2 text-white rounded ${
                page === Math.ceil(totalItems / pageSize)
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-700"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default ProductList;
