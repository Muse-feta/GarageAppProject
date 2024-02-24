import React, { useState } from "react";
import logo from "../../../assets/images/logo.png";
import { FaWindowClose } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { useAuth } from "../../../context/AuthContext";
import { logOut } from "../../../../util/auth";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(useAuth())
  const { employee, isLoged, setIsLoged } = useAuth();

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOut = () => {
    logOut();
    setIsLoged(false);
  }

  return (
    <div className=" sticky top-0 bg-white z-10 shadow-lg">
      <header className="main-header header-style-one">
        <div className="header-upper ">
          <div className="auto-container">
            <div className="inner-container">
              <div className="logo-box">
                <div className="logo">
                  {!isOpen ? (
                    <a href="/">
                      <img src={logo} alt="" />
                    </a>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
              <div className="right-column">
                <div className="nav-outer">
                  <div className="mobile-nav-toggler">
                    <img
                      src="./template-assets/assets/images/icons/icon-bar.png"
                      alt=""
                    />
                  </div>

                  <nav className="main-menu navbar-expand-md navbar-light hidden lg:block">
                    <div
                      className="   navbar-collapse  show clearfix"
                      id="navbarSupportedContent"
                    >
                      <ul className="navigation">
                        <li className="dropdown hover:text-red-500">
                          <a href="/">Home</a>
                        </li>
                        <li classNameName="dropdown">
                          <a href="/about">About Us</a>
                        </li>
                        <li className="dropdown">
                          <a href="/services">Services</a>
                        </li>
                        <li>
                          <a href="/contact">Contact Us</a>
                        </li>
                      </ul>
                    </div>
                  </nav>

                  <div class="link-btn ml-3">
                    {isLoged ? (
                      <a
                        className="theme-btn btn-style-one text-white"
                        handleClick={handleLogOut}
                      >
                        LogOut
                      </a>
                    ) : (
                      <a href="/login" className="theme-btn btn-style-one">
                        Login
                      </a>
                    )}
                  </div>

                  <button className=" text-4xl lg:hidden" onClick={handleOpen}>
                    {isOpen ? (
                      <div className=""></div>
                    ) : (
                      <div className=" text-2xl flex justify-center items-center">
                        <TiThMenu />
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {isOpen && (
        <div className="bg-white  top-0 h-[300px] md:hidden">
          <h1
            className=" flex justify-end mr-4 text-3xl cursor-pointer"
            onClick={handleOpen}
          >
            <FaWindowClose />
          </h1>

          <h1 className=" text-center cursor-pointer mt-0 font-extrabold text-2xl">
            Home
          </h1>
          <h1 className=" text-center cursor-pointer mt-4 font-extrabold text-2xl">
            SERVICES
          </h1>
          <h1 className=" text-center cursor-pointer mt-4 font-extrabold text-2xl">
            ABOUT US
          </h1>
          <h1 className=" text-center cursor-pointer mt-4 font-extrabold text-2xl">
            CONTACT US
          </h1>
          <div className="link-btn mt-3 flex justify-center items-center">
            {isLoged ? (
              <h1
                className="theme-btn btn-style-one text-white"
                onClick={handleLogOut}
              >
                LogOut
              </h1>
            ) : (
              <a href="/login" className="theme-btn btn-style-one">
                Login
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
