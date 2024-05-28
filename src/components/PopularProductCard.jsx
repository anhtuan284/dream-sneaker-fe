import { useNavigate } from "react-router-dom";
import { star } from "../assets/icons";
import Nav from "./Nav";

const PopularProductCard = ({ imgURL, name, price, image, id }) => {
  const nav = useNavigate();
  const shoeDetail = (id) => {
    let url = `/api/Shoe/${id}`;
    nav(url);
  };
  return (
    <>
      <div className="flex flex-1 flex-col w-full max-sm:w-full hover:scale-105 duration-100">
        {imgURL ? (
          <img src={imgURL} alt={name} className="w-[282px] h-[282px]" />
        ) : (
          <div
            className="relative p-6 space-y-4 md:space-y-6 sm:p-8 bg-cover bg-center bg-card"
            onClick={() => shoeDetail(id)}
          >
            <img
              src={image}
              alt={name}
              className="w-[282px] h-[282px]"
              onClick={() => shoeDetail(id)}
            />
          </div>
        )}
        <div className="mt-8 flex justify-start gap-2.5">
          <img src={star} alt="rating icon" width={24} height={24} />
          <p className="font-montserrat text-xl leading-normal text-slate-gray">
            (4.5)
          </p>
        </div>
        <h3 className="mt-2 text-2xl leading-normal font-semibold font-palanquin">
          {name}
        </h3>
        <p className="mt-2 font-semibold font-montserrat text-coral-red text-2xl leading-normal">
          $ {price}.00 USD
        </p>
      </div>
    </>
  );
};

export default PopularProductCard;
