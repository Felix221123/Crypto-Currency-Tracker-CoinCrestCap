import { useState, useRef, useEffect } from "react";
import LOGO from "/assets/img/Logo.png";
import MenuHamburger from "/assets/svg/menu.svg";
import SearchIcon from "/assets/svg/search.svg";
import { NavRefs } from "../App/MainApp";
import MenuClose from "/assets/svg/menuclose.svg";
import { motion, AnimatePresence } from "framer-motion";
import "./Navbar.css";
import { SearchComponent } from "./SearchContainer";

interface scrollIntoViewProps {
  scrollIntoView: (nav: keyof NavRefs) => void;
}

export const Navbar = ({ scrollIntoView }: scrollIntoViewProps) => {
  const [menuVisibility, setMenuVisibility] = useState<boolean>(false);
  const [activeNav, setActiveNav] = useState<string>("");
  const [searchContainer, setSearchContainer] = useState<boolean>(false);
  const searchContainerRef = useRef<HTMLDivElement>(null); // creating a ref to reference the search container
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const navList: (keyof NavRefs)[] = [
    "Home",
    "About us",
    "Cryptocurrencies",
    "Contact us",
  ];

  const handleMenuVisibility = () => {
    setMenuVisibility((previous) => !previous);
  };

  // handles the navigation
  const handleMenuNavigation = (nav: keyof NavRefs) => {
    scrollIntoView(nav);
    setActiveNav(nav);
    setMenuVisibility(false);
  };

  const getMenuAnimationVariants = () => ({
    hidden: { left: -300, opacity: 0 },
    visible: { left: 0, opacity: 1 },
    exit: { left: -300, opacity: 0 },
  });

  const handleSearchContainer = () => {
    setSearchContainer(true);
  };

  const handleCloseSearchContainer = () => {
    setSearchContainer(false);
  };

  // Effect to handle clicks outside the search container
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainer &&
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setSearchContainer(false);
      }
    };

    // Add event listener when the search container is open
    if (searchContainer) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchContainer]); // Dependencies array, ensures effect runs only when `searchContainer` state changes

  // Effect to handle clicks outside the menu container
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuVisibility &&
        menuContainerRef.current &&
        !menuContainerRef.current.contains(event.target as Node)
      ) {
        setMenuVisibility(false);
      }
    };

    // Add event listener when the menu container is open
    if (menuVisibility) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuVisibility]); // Dependencies array, ensures effect runs only when `menuVisibility` state changes

  // body stays fixed not allowing users to scroll
  useEffect(() => {
    if (menuVisibility || searchContainer) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    // Cleanup function to ensure the class is removed when the component unmounts
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [menuVisibility , searchContainer]); // Dependency array to run effect when `menuVisibility` changes


  return (
    <>
      {/* menu for desktop based */}
      <div className="desktopContainer">
        {/* logo container here */}
        <div className="logoContainer">
          <img src={LOGO} alt="logo use here" />
        </div>

        {/* nav buttons */}
        <nav className="navContainer">
          {navList.map((nav, index) => (
            <p
              className={`eachNavLink font-bold ${
                activeNav === nav ? "active" : ""
              }`}
              key={index}
              onClick={() => handleMenuNavigation(nav)}
            >
              {nav}
            </p>
          ))}
        </nav>

        {/* search area on desktop */}
        <button className="searchArea" onClick={handleSearchContainer}>
          <label htmlFor="cryptoSearch">
            <div className="imageSearch">
              <img src={SearchIcon} alt="" />
              <p className="searchTxt">Search</p>
            </div>
            <div className="triggerSearch">/</div>
          </label>
        </button>
      </div>

      {/* menu for mobile and tablet */}
      <div className="mobileMenuContainer">
        {/* logo container here */}
        <div className="logoContainer">
          <img src={LOGO} alt="logo use here" />
        </div>

        <AnimatePresence>
          <img
            src={menuVisibility ? MenuClose : MenuHamburger}
            alt="menu icon"
            onClick={handleMenuVisibility}
          />
        </AnimatePresence>
      </div>

      {/* menu visibility for mobile */}
      <AnimatePresence>
        {menuVisibility && (
          <motion.div
            className="menuContainer"
            initial={getMenuAnimationVariants().hidden}
            animate={getMenuAnimationVariants().visible}
            exit={getMenuAnimationVariants().exit}
            transition={{ duration: 0.5 }}
            ref={menuContainerRef}
          >
            {navList.map((nav, index) => (
              <p
                className="eachNav font-bold leading-4"
                key={index}
                onClick={() => handleMenuNavigation(nav)}
              >
                {nav}
              </p>
            ))}
            <a
              href="https://felixbaah.com/"
              target="_blank"
              className="profile font-bold leading-5"
            >
              Powered by Felix
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* search visibility for users */}
      {searchContainer && (
        <SearchComponent
          isActive={searchContainer}
          onClose={handleCloseSearchContainer}
        />
      )}
      {searchContainer && ( <div className="overlay"></div> )}
    </>
  );
};
