import { screen, render } from "@testing-library/react";
import { Home } from "../components/Base/Home";
import BTC from "/assets/img/btc.jpg";
import USDT from "/assets/img/usdt.jpg";
import ETH from "/assets/img/eth-blue.jpg";
import ETHGREEN from "/assets/img/eth.jpg";
import BlackBtc from "/assets/svg/Group.svg";

describe("Home Component", () => {
  // this test the ability the to display the header in the home component
  it("it should display the heading", async () => {
    render(<Home />);
    const heading = screen.getByRole("heading", {
      name: /Dynamic Crypto Market Updates Every Hour/i,
    });

    expect(heading).toBeInTheDocument();
    expect(heading).toBeVisible();
    expect(heading).toHaveTextContent(
      "Dynamic Crypto Market Updates Every Hour"
    );

    // Optionally check for the presence of the span with a specific class
    const span = screen.getByText(/Crypto Market/i);
    expect(span).toBeInTheDocument();
    expect(span).toHaveClass("diffClr");
  });

  // this test should display the paragraph in the document
  it("it should display the correct paragraph text and button", async () => {
    render(<Home />);
    const paragraphText =
      /Experience the pulse of the cryptocurrency world with our real-time 24-hour dashboard. Stay informed and seize opportunities as they arise, ensuring you're always ahead of the curve in this fast-paced market/i;
    const paragraph = screen.getByText(paragraphText);

    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toBeVisible();
  });

  // this test should display the get started button
  it("it should display the presence of the get started button", () => {
    render(<Home />);
    const button = screen.getByRole("button", { name: "Get started" });
    expect(button).toBeInTheDocument();
    expect(button).toBeVisible();
  });

  //it should display all the images when the screen width is 1440px
  it("it should display the images available", () => {
    render(<Home />);
    const btcImages = screen.getAllByAltText("bitcoin image");
    const btcImageSources = [BTC, BTC, BTC, BTC]; // Since BTC image is used multiple times
    btcImages.forEach((img, index) => {
      expect(img).toHaveAttribute("src", btcImageSources[index]);
    });

    const blackBtcImage = screen.getByAltText("bitcoin black");
    expect(blackBtcImage).toHaveAttribute("src", BlackBtc);

    const usdtImage = screen.getByAltText("usdt black");
    expect(usdtImage).toHaveAttribute("src", USDT);

    const ethImage = screen.getByAltText("eth block");
    expect(ethImage).toHaveAttribute("src", ETH);

    const ethGreenImage = screen.getByAltText("eth block green");
    expect(ethGreenImage).toHaveAttribute("src", ETHGREEN);
  });
});
