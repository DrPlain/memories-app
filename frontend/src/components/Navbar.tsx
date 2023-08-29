import { AiOutlineMenu, AiOutlineClose, AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";
import PostForm from "./PostForm";
import { IDisplayPostForm } from "../types";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/features/userSlice";

export default function Navbar({
  displayPostForm,
  showPostForm,
}: {
  displayPostForm: IDisplayPostForm;
  showPostForm: boolean;
}) {
  const [isNavOpen, setNavOpen] = useState(false);
  const loggedInUser = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const userInitials =
    `${loggedInUser?.firstName.charAt(0)}.${loggedInUser?.lastName.charAt(
      0
    )}` || null;

  const handleNav = () => {
    setNavOpen((prevState) => !prevState);
  };

  const handleNavItemClick = () => {
    // Close the navbar when a navbar item is clicked
    setNavOpen(false);
  };
  return (
    <nav className="fixed w-full">
      <div className="h-20 shadow-xl w-full flex items-center justify-between p-4 bg-gray-800">
        <Link to="/">
          <p className="flex items-center font-bold text-3xl md:text-3xl md:4xl lg:5xl text-white">
            <span className="text-white pr-2">
              <AiOutlineHome size={35} />{" "}
            </span>
            Memories
          </p>
        </Link>
        {/* Mobile Nav */}
        <div className="flex items-center md:hidden">
          <div onClick={handleNav}>
            {isNavOpen ? (
              <AiOutlineClose
                size={30}
                className="my-auto text-white ml-4 hover:border"
              />
            ) : (
              <AiOutlineMenu
                size={30}
                className="my-auto text-white ml-4 hover:border"
              />
            )}
          </div>
        </div>

        {/* Nav Items */}
        <ul
          className={`text-xl text-white md:flex md:text-xl md:uppercase md:font-bold hidden ${
            isNavOpen ? "block" : "hidden"
          } md:block`}
        >
          {/* {loggedInUser && <button>{userInitials}</button>} */}
          <NavItem
            to="#"
            isNavOpen={isNavOpen}
            label="Create memory"
            showPostForm={displayPostForm}
          />
          {loggedInUser ? (
            <NavItem
              to="#"
              isNavOpen={isNavOpen}
              label={`Logout ${userInitials}`}
              onClick={dispatch(logout)}
            />
          ) : (
            <>
              <NavItem to="#" isNavOpen={isNavOpen} label="Login" />
              <NavItem to="/register" isNavOpen={isNavOpen} label="Sign Up" />
            </>
          )}
        </ul>

        {/* Mobile Nav Links */}
        {isNavOpen && (
          <ul className="fixed left-0 top-0 my-[80px] text-xl uppercase font-bold bg-gray-100 text-gray-800 w-full ease-in-out duration-500 md:hidden">
            {loggedInUser ? (
              <>
                <NavItem
                  to="/"
                  isNavOpen={isNavOpen}
                  label="Home"
                  onClick={handleNavItemClick}
                />
                <NavItem
                  to="/create-memory"
                  isNavOpen={isNavOpen}
                  label="Create memories"
                  onClick={handleNavItemClick}
                />
                <NavItem
                  to="#"
                  isNavOpen={isNavOpen}
                  label="Logout"
                  onClick={handleNavItemClick}
                />
              </>
            ) : (
              <NavItem
                to="/register"
                isNavOpen={isNavOpen}
                label="Sign Up"
                onClick={handleNavItemClick}
              />
            )}
          </ul>
        )}
      </div>
      {showPostForm && (
        <div className="md:fixed top-20 right-0 hidden md:block">
          <PostForm displayForm={displayPostForm} />
        </div>
      )}
    </nav>
  );
}

interface IonClick {
  (): void;
}
function NavItem({
  label,
  isNavOpen,
  to,
  onClick,
  showPostForm,
}: {
  label: string;
  isNavOpen: boolean;
  to: string;
  onClick?: IonClick;
  showPostForm?: IDisplayPostForm;
}) {
  const handleItemClick = () => {
    if (typeof onClick === "function") {
      onClick(); // Call the provided onClick handler if it's a function
    }
    if (showPostForm) {
      showPostForm();
    }
  };
  return (
    <li
      className={`py-2 px-4 hover:bg-gray-800 hover:text-white ${
        isNavOpen
          ? "border-b md:border md:rounded-lg md:m-2 md:hover:bg-white md:hover:text-gray-800 text-gray-800"
          : "border m-2 rounded-lg hover:bg-sky-800 hover:text-white text-white"
      } border-blue-200`}
      onClick={handleItemClick}
    >
      <Link to={to}>{label}</Link>
    </li>
  );
}
