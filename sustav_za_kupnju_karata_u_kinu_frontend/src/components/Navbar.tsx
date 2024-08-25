import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectAuth } from "../state/auth/authSlice";
import { Tooltip } from "react-tooltip";

export const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { token, user, role } = useSelector(selectAuth);

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
        {role === "Admin" && (
          <li
            className="cursor-pointer rounded-lg px-3 py-1"
            onClick={() => {
              setMenuOpen(false);
              navigate("/dashboard");
            }}
          >
            Dashboard
          </li>
        )}
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

          <LoginIcon fontSize="medium" className="text-quaternary" />
        </button>

        <button
          name="logout"
          data-tooltip-id="logout-button"
          data-tooltip-content={`User: ${user}`}
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
          <LogoutIcon fontSize="medium" /> Log out
          <Tooltip id="logout-button" />
        </button>
        <button
          name="menu"
          className="text-3xl cursor-pointer md:xl xl:hidden max-xl:right-28 mt-[-0.6rem]"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
    </div>
  );
};
