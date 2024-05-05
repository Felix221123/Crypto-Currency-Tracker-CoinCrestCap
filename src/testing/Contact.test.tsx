import { screen, render } from "@testing-library/react";
import { ContactUs } from "../components/Base/ContactUs";
import Logo from "/assets/img/Logo.png";

describe("Contact Us Component", () => {
  it("it should display company logos and the links should be working", () => {
    render(<ContactUs />);
    const logo = screen.getByAltText("site logo");
    expect(logo).toHaveAttribute("src", Logo);
  });
  // it should test all links in the footer
  it("it should test all links in the footer", () => {
      render(<ContactUs />);
      
    //   linked in link
    const linkedInLink = screen.getByRole("link", { name: /Linkedin/i }); // Adjust the name based on the content or aria-label of your link if needed
    expect(linkedInLink).toBeInTheDocument();
    expect(linkedInLink).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/felix-baah-938815258/"
    );
      expect(linkedInLink).toHaveAttribute("target", "_blank");
      
    // already test all links
    const websiteLink = screen.getByRole("link", { name: /website/i }); // Adjust the name based on the content or aria-label of your link if needed
    expect(websiteLink).toBeInTheDocument();
    expect(websiteLink).toHaveAttribute(
      "href",
      "https://felixbaah.com/"
    );
    expect(websiteLink).toHaveAttribute("target", "_blank");
  });
});
