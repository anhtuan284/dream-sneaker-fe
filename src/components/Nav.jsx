import { useContext } from "react";
import { hamburger } from "../assets/icons";
import { headerLogo } from "../assets/images";
import { navLinks } from "../constants";
import MyContext from "../config/MyContext";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const [user, dispatch] = useContext(MyContext);
  const nav = useNavigate();
  const logout = () => {
    dispatch({
      type: "logout",
    });
    localStorage.removeItem("access_token");
    nav("/login");
  };
  return (
    <header className="padding-x py-8 absolute z-10 w-full">
      <nav className="flex justify-between items-center max-container">
        <Link to="/">
          <img
            src={headerLogo}
            alt="logo"
            width={129}
            height={29}
            className="m-0 w-[129px] h-[29px]"
          />
        </Link>
        <ul className="flex-1 flex justify-center items-center gap-16 max-lg:hidden">
          {navLinks.map((item) => (
            <li key={item.label} className="">
              <Link
                to={item.href}
                className="font-montserrat leading-normal text-lg text-slate-gray hover:font-bold hover:text-xl duration-150 "
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        {user === null ? (
          <>
            <div className="flex gap-2 text-lg leading-normal font-medium font-montserrat max-lg:hidden wide:mr-24 hover:font-bold hover:text-xl duration-150">
              <Link to="/login" className="text-primary-400 font-bold">
                Sign in
              </Link>
              <span>/</span>
              <Link to="/">Explore now</Link>
            </div>
          </>
        ) : (
          <>
            <div className="flex gap-2 text-lg cursor-pointer leading-normal font-medium font-montserrat max-lg:hidden wide:mr-24 ">
              <span className="text-primary-700 font-bold hover:font-bold hover:text-xl duration-150">
                {" "}
                {user.username}
              </span>
              {" • "}
              <span onClick={logout} className="text-red-400 font-bold hover:font-bold hover:text-xl duration-150">
                Logout
              </span>
            </div>
          </>
        )}
        <div className="hidden max-lg:block">
          <img src={hamburger} alt="hamburger icon" width={25} height={25} />
        </div>
      </nav>
    </header>
  );
};

export default Nav;
