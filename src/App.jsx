import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import LandingPage from "./sections/LandingPage";
import NoPage from "./sections/NoPage";
import { Nav } from "./components";
import Home from "./sections/Home";
import Login from "./sections/Login";
import MyUserReducer from "./assets/reducer/MyUserReducer";
import MyContext from "./config/MyContext";
import { useReducer } from "react";
import ShoeDetail from "./components/ShoeDetail";
import Register from "./sections/LandingPage/Register";

const App = () => {
  const [user, dispatch] = useReducer(MyUserReducer, null);
  return (
    <>
      <MyContext.Provider value={[user, dispatch]}>
        <Nav />
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/api/Shoe/:id" element={<ShoeDetail />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </MyContext.Provider>
    </>
  );
};

export default App;
