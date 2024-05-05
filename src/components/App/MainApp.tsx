import { AboutUs } from "../Base/AboutUs";
import { ContactUs } from "../Base/ContactUs";
import { Cryptocurrencies } from "../Base/Cryptocurrencies";
import { Home } from "../Base/Home";
import { Navbar } from "../Navbar/Navbar";
import { RefObject, createRef } from "react";

export interface NavRefs {
  Home: RefObject<HTMLDivElement>;
  "About us": RefObject<HTMLDivElement>;
  Cryptocurrencies: RefObject<HTMLDivElement>;
  "Contact us": RefObject<HTMLDivElement>;
}

export const MainApp = () => {

  const refs: NavRefs = {
    Home: createRef<HTMLDivElement>(),
    "About us": createRef<HTMLDivElement>(),
    Cryptocurrencies: createRef<HTMLDivElement>(),
    "Contact us": createRef<HTMLDivElement>(),
  };

  // Scroll to the component
  const scrollToComponent = (nav: keyof NavRefs) => {
    if (refs[nav] && refs[nav]?.current) {
      refs[nav]!.current!.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  

  return (
    <>
      <Navbar scrollIntoView={scrollToComponent} />
      <div className="home" ref={refs.Home}>
        <Home />
      </div>
      {/* Other sections might be added here, e.g., */}
      <div className="aboutUs" ref={refs["About us"]}>
        <AboutUs />
      </div>
      <div className="crypto" ref={refs.Cryptocurrencies}>
        <Cryptocurrencies />
      </div>
      <div className="contactUs" ref={refs["Contact us"]}>
        <ContactUs />
      </div>
    </>
  );
};
