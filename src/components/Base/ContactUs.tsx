import Logo from "/assets/img/Logo.png";
import Location from "/assets/svg/location.svg";
import Email from "/assets/svg/email.svg";
import Phone from "/assets/svg/phone.svg";
import { Linkedin } from "../Icons/Linkedin";
import { Twitter } from "../Icons/Twitter";
import { Instagram } from "../Icons/Instagram";
import { Github } from "../Icons/Github";
import "./styles/ContactUs/ContactUs.css"

export const ContactUs = () => {
  const contactInfo: string[] = [
    "London, United Kingdom",
    "felixbaah47@gmail.com",
    "(44)793-1115-680",
  ];

  return (
    <>
      <div className="contactUsSection">
        {/* container for navbar and email subscription */}
        <div className="mainFooterSection">
          {/* logo section */}
          <div className="logoSection">
            <img src={Logo} alt="site logo" />
            <p className="txt font-normal leading-4">Your Daily Crypto</p>
            <div className="socialIcons">
              <a
                aria-label="Linkedin"
                className="border"
                target="_blank"
                href="https://www.linkedin.com/in/felix-baah-938815258/"
              >
                <Linkedin />
              </a>
              <a
                aria-label="Twitter"
                className="border"
                target="_blank"
                href="https://twitter.com/IxKvfi"
              >
                <Twitter />
              </a>
              <a
                aria-label="Instagram"
                className="border"
                target="_blank"
                href="https://www.instagram.com/kvfi_ix/"
              >
                <Instagram />
              </a>
              <a
                aria-label="Github"
                className="border"
                target="_blank"
                href="https://github.com/Felix221123"
              >
                <Github />
              </a>
            </div>
          </div>

          {/* contact nav section */}
          <div className="contactNavSection">
            {/* nav section */}
            <div className="navSection">
              <p className="nav font-normal">About Us</p>
              <p className="nav font-normal">Cryptocurrencies</p>
              <p className="nav font-normal">Contact Us</p>
            </div>
            {/* contact section */}
            <div className="contactSection">
              <article className="font-semibold leading-5">Contact</article>
              <div className="infoSection">
                <img src={Location} alt="location icon" />
                <span className="iconInfo font-normal leading-4">{contactInfo[0]}</span>
              </div>
              <div className="infoSection">
                <img src={Email} alt="email icon" />
                <span className="iconInfo font-normal leading-4">{contactInfo[1]}</span>
              </div>
              <div className="infoSection">
                <img src={Phone} alt="phone icon" />
                <span className="iconInfo font-normal leading-4">{contactInfo[2]}</span>
              </div>
            </div>
          </div>

          {/* email sub section */}
          <div className="emailSubSection">
            <p className="inform font-bold leading-6">Let us Inform You Every Hour</p>
            <div className="formGroup">
              <label htmlFor="email">
                <input type="text" id="email" placeholder="Enter your email" />
              </label>
              <button type="submit" className="font-semibold leading-5">
              Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* container for copyright */}
        <div className="copyRight flex flex-col">
          <a href="https://felixbaah.com/" target="_blank" className="copyright text-white text-center" aria-label="website">
            © Copyright Felix Baah 2024
          </a>
        </div>
      </div>
    </>
  );
};
