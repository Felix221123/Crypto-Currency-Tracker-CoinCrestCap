import { screen, render  } from "@testing-library/react";
import { AboutUs } from "../components/Base/AboutUs";



describe('About Us Component', () => {
    // testing whether the headers are paragraph is working
    it("it should display the headers and paragraph", () => {
        render(<AboutUs />);
        const heading = screen.getByRole("heading", { name: /Crypto Clock Always on Time, Always on Trend/i });
        expect(heading).toBeVisible();
        expect(heading).toBeInTheDocument();

        // Paragraph with more flexible matching
        const paragraphText = /The Current State of Cryptocurrency:.*Global Market Cap Reaches \$2\.59 Trillion/i;
        const paragraph = screen.getByText(paragraphText);
        
        expect(paragraph).toBeInTheDocument();
    });

    
    
})