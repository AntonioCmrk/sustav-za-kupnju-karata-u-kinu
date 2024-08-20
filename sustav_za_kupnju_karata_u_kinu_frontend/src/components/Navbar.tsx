import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Close, LogIn, LogOut, Menu } from "react-ionicons";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectAuth } from "../state/auth/authSlice";

export const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { token } = useSelector(selectAuth);

  return (
    <div className="bg-primary w-[99%] h-16  rounded-full my-2">
      <h1
        className="absolute p-4 cursor-pointer text-xl font-bold text-accent z-20"
        onClick={() => navigate("/")}
      >
        Buying tickets
      </h1>
      <ul
        className={`flex justify-center mx-auto relative p-4 [&>*]:mx-2 [&>*]:text-quaternary hover:[&>*]:text-primary hover:[&>*]:bg-quaternary  max-xl:bg-secondary max-xl:flex-col max-xl:mt-[4.5rem] max-xl:text-center rounded-2xl max-xl:z-10 list-outside [&>*]:max-xl:m-4 ${
          menuOpen ? "" : "max-xl:hidden"
        }`}
      >
        <li
          className="cursor-pointer rounded-lg px-3 py-1"
          onClick={() => {
            setMenuOpen(false);
            navigate("/");
          }}
        >
          Choose cinema
        </li>
        <li
          className="cursor-pointer rounded-lg px-3 py-1"
          onClick={() => {
            setMenuOpen(false);
            navigate("/cinema-page");
          }}
        >
          Choose movie
        </li>
      </ul>
      <div className="absolute p-4 right-4 top-3 flex gap-4 text-terary-light">
        <button
          name="login"
          className={`cursor-pointer  flex align-middle justify-center text-quaternary-light ${
            token ? "hidden" : ""
          }`}
          onClick={() => {
            navigate("/auth");
          }}
        >
          <span>Log in</span>
          <LogIn color="#c7fdfd" title={"Log in"} />
        </button>

        <button
          name="logout"
          className={`cursor-pointer  flex align-middle justify-center text-quaternary-light ${
            token ? "" : "hidden"
          }`}
          onClick={() => {
            dispatch(logout());
            localStorage.removeItem("token");
            toast("You have loged out successfully.", {
              style: {
                borderRadius: "20px",
              },
            });
          }}
        >
          <LogOut color="#c7fdfd" /> Log out
        </button>
        <button
          name="menu"
          className="text-3xl cursor-pointer md:xl xl:hidden max-xl:right-28"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <Close color="#c7fdfd" /> : <Menu color="#c7fdfd" />}
        </button>
      </div>
      {/* <button
        name="username"
        className={`hover:outline outline-violet-800 rounded-xl absolute p-2 right-4 top-3  cursor-pointer  flex align-middle justify-center ${
          isLoggedIn === "true" ? "" : "hidden"
        }`}
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        type="button"
        onClick={() => {}}
      >
        <div className="mr-1 mt-[-0.15rem] flex flex-col relative">
          <span>Signed in as </span>
          <span className="text-violet-950 font-bold text-lg">username</span>
        </div>
        <div className="relative top-3 ml-2">
          <ArrowDownCircleOutline color="#4C1D95" />
        </div>
      </button>
      <div
        className={`z-10  bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-slate-200 absolute right-7 top-20 ${
          logoutMenu === true ? "" : "hidden"
        }`}
      ></div>

      
       */}
    </div>
  );
};
