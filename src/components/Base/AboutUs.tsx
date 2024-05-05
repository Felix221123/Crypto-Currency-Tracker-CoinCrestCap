// import MarketDownSym from "/assets/svg/symbol-down.svg"
import ViewMoreSym from "/assets/svg/Symbol-more.svg";
import MarketCapChart from "/assets/img/total_market_cap.svg.svg";
import MarketCap24hrChart from "/assets/img/marketcap24hrvolume.svg";
import "./styles/Aboutus/AboutUs.css";
import {
  RootObjectOfMarketCap,
  TrendingCoinsProps,
  Item,
  RootObjectMarketPercentageCap,
  CoinInfo,
  CoinSearchGecko,
  MarketCapPercentage,
} from "../Interface/About-us-interface";
import { useState, useEffect, ReactNode } from "react";
import { GreenBull } from "../Icons/GreenBull";
import { RedBear } from "../Icons/RedBear";

export const AboutUs = () => {
  const [MarketCapData, setMarketCapData] =
    useState<RootObjectOfMarketCap | null>(null);
  const [trendingCoins, setTrendingCoins] = useState<TrendingCoinsProps[]>([]);
  const [percentageChange, setPercentageChange] = useState<number>(0);
  const [icon, setIcon] = useState<ReactNode>("");
  const [color, setColor] = useState<string>("");

  const pageContent = {
    header: "Crypto Clock Always on Time, Always on Trend",
    paraGraph:
      "The Current State of Cryptocurrency: Global Market Cap Reaches $2.59 Trillion",
  };

  // using the use Effect hook to set the market cap data api
  useEffect(() => {
    const getMarketCapData = async () => {
      const options = {
        method: "GET",
        // headers: {
        //   'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
        //   'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        // }
      };
      const url = "/coinpaprika/global";
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(
            `HTTP Error: ${response.status} ${response.statusText}`
          );
        }
        const json = await response.json();
        setMarketCapData(json as RootObjectOfMarketCap); // set states here
        // Simulate setting percentage change from fetched data
        const change = parseFloat(json.market_cap_change_24h);
        setPercentageChange(Math.abs(change));
        setIcon(change >= 0 ? <GreenBull /> : <RedBear />);
        setColor(change >= 0 ? "#16C784" : "#EA3943");
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    getMarketCapData(); // Execute the function defined above
  }, []); // Empty dependency array means this effect runs only once after the component mounts

  // another data fetch for the trending coins container
  useEffect(() => {
    const getTrendingCoins = async () => {
      try {
        const response = await fetch("/api/search/trending");
        const trendingSearch = await response.json();
        setTrendingCoins(trendingSearch.coins as TrendingCoinsProps[]);
        // console.log(trendingSearch.coins);
      } catch (error) {
        console.error("Failed to fetch trending coins:", error);
      }
    };
    getTrendingCoins();
  }, []);

  return (
    <>
      <div className="aboutUsContainer">
        {/* page content header */}
        <div className="headerContainer">
          <h2 className="font-bold leading-10">{pageContent.header}</h2>
          <p className="para font-normal">{pageContent.paraGraph}</p>
        </div>

        {/* containers for coins trending */}
        {MarketCapData ? (
          <div className="trendingContainers">
            {/* marketCap Containers */}
            <div className="marketCapContainer containerStyle">
              <div className="marketCap">
                {/* text section */}
                <div className="textSection">
                  <p className="capAmount font-bold leading-6">
                    ${MarketCapData.market_cap_usd.toLocaleString()}
                  </p>
                  <p className="capText font-normal">
                    Market Cap
                    {icon}
                    <span
                      className="change24hr font-normal"
                      style={{ color: color }}
                    >
                      {percentageChange.toFixed(2)}%
                    </span>
                  </p>
                </div>

                {/* graph chart section */}
                <div className="chartSection">
                  <img
                    src={MarketCapChart}
                    alt="chart from design"
                    className="w-full h-full"
                  />
                </div>
              </div>

              {/* 24 hr volume */}
              <div className="hrVolume">
                <div className="textSection">
                  <p className="capAmount font-bold leading-6">
                    ${MarketCapData.volume_24h_usd.toLocaleString()}
                  </p>
                  <p className="capText font-normal">24h Trading Volume </p>
                </div>

                {/* graph chart section */}
                <div className="chartSection">
                  <img
                    src={MarketCap24hrChart}
                    alt="chart design from figma"
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>

            {/* trending coins */}
            {trendingCoins.length > 0 && (
              <div className="trendingContainer containerStyle">
                {/* header section */}
                <div className="headerSection">
                  <p className="headerTxt font-normal">Trending</p>
                  <a
                    className="view font-normal"
                    href="https://felixbaah.com/"
                    target="_blank"
                  >
                    View more <img src={ViewMoreSym} alt="view more section" />{" "}
                  </a>
                </div>

                {/* other currencies*/}
                <div className="coinsContainer">
                  {/* first coin */}
                  <CoinDisplay
                    key={trendingCoins[0].item.coin_id}
                    coin={trendingCoins[0].item}
                  />
                  <CoinDisplay
                    key={trendingCoins[1].item.coin_id}
                    coin={trendingCoins[1].item}
                  />
                  <CoinDisplay
                    key={trendingCoins[2].item.coin_id}
                    coin={trendingCoins[2].item}
                  />
                </div>
              </div>
            )}

            {/* Market Dominance Container */}
            <div className="gainersContainer containerStyle">
              {/* header section */}
              <div className="headerSection">
                <p className="headerTxt font-normal">Market Dominance</p>
                <a
                  className="view font-normal"
                  href="https://felixbaah.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View more <img src={ViewMoreSym} alt="view more section" />{" "}
                </a>
              </div>

              {/* other currencies*/}
              <MarketDominanceCoinDisplay />
            </div>
          </div>
        ) : (
          <p className="text-center">Loading data.....</p>
        )}
      </div>
    </>
  );
};

const CoinDisplay = ({ coin }: { coin: Item }) => {
  const change = Number(coin.data.price_change_percentage_24h.usd);
  const icon = change >= 0 ? <GreenBull /> : <RedBear />;
  const color = change >= 0 ? "#16C784" : "#EA3943";

  const capitalizeFirstLetter = (word: string) => {
    if (!word) return ""; // Return an empty string if no word is provided
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };
  const name = capitalizeFirstLetter(coin.name);

  return (
    <div className="eachCoinContainer">
      <div className="leftHandSide">
        <img src={coin.thumb} alt="image of the coin or token" />
        <p className="coinName font-normal">{name}</p>
      </div>
      <div className="rightHandSide">
        <p className="coinPrice leading-5 font-medium">
          ${coin.data.price.toFixed(2)}
        </p>
        {icon}
        <p
          className="changeInPrice font-normal leading-5"
          style={{ color: color }}
        >
          {Math.abs(change).toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

const MarketDominanceCoinDisplay = () => {
  const [marketDominanceData, setMarketDominanceData] =
    useState<RootObjectMarketPercentageCap | null>(null);
  const capitalizeFirstLetter = (word: string) => {
    if (!word) return ""; // Return an empty string if no word is provided
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  //another data fetch for market dominance in the crypto market
  useEffect(() => {
    const getMarketDominanceData = async () => {
      try {
        const response = await fetch("/api/global");
        const getData = await response.json();
        setMarketDominanceData(getData as RootObjectMarketPercentageCap);
      } catch (error) {
        console.error("Failed to fetch trending coins:", error);
      }
    };
    getMarketDominanceData();
  }, []);

  const [coinsInfo, setCoinsInfo] = useState<CoinInfo[]>([]);

  useEffect(() => {
    const getSymbol = ["BTC", "ETH", "USDT"]; // Only fetch for these symbols as they are displayed

    const getNameAndThumb = async (
      symbol: string
    ): Promise<CoinInfo | null> => {
      try {
        const response = await fetch(`/api/search?query=${symbol}`);
        const data = await response.json();
        const filteredCoin = data.coins.find(
          (coin: CoinSearchGecko) => coin.symbol.toUpperCase() === symbol
        );
        if (filteredCoin) {
          return {
            name: filteredCoin.name,
            large: filteredCoin.thumb,
            symbol: filteredCoin.symbol,
          };
        }
        return null;
      } catch (error) {
        console.error(`Failed to fetch data for symbol ${symbol}:`, error);
        return null;
      }
    };

    const fetchData = async () => {
      const results = await Promise.all(
        getSymbol.map((symbol) => getNameAndThumb(symbol))
      );
      setCoinsInfo(
        results.filter((result): result is CoinInfo => result !== null)
      );
    };

    fetchData();
  }, []);

  return (
    <div className="coinsContainer">
      {coinsInfo &&
        coinsInfo.map((coin, index) => (
          <div key={index} className="eachCoinContainer">
            <div className="leftHandSide">
              <img src={coin.large} alt={`Image of ${coin.name}`} />
              <p className="coinName font-normal">
                {capitalizeFirstLetter(coin.name)}
              </p>
            </div>
            <div className="rightHandSide">
              <p className="coinPrice leading-5 font-medium">
                {marketDominanceData
                  ? `${marketDominanceData.data.market_cap_percentage[
                      coin.symbol.toLowerCase() as keyof MarketCapPercentage
                    ].toFixed(2)}%`
                  : "Loading..."}
              </p>
            </div>
          </div>
        ))}
      {!coinsInfo && (
        <p className="text-center text-white leading-5 font-semibold text-2xl">
          Loading Data....
        </p>
      )}
    </div>
  );
};
