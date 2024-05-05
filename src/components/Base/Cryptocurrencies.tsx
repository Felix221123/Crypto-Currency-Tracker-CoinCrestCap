import CryptoCurrency from "/assets/svg/cryptocurrency.svg";
import filter from "/assets/svg/filter.svg";
import Display from "/assets/svg/change-display.svg";
import Category from "/assets/svg/category.svg";
import "./styles/Cryptocurriencies/Cryptocurrency.css";
import { useEffect, useState } from "react";
import {
  Coin,
  RootObjectForCryptoCurrencies,
} from "../Interface/Cryptocurrincies";
import { RootObjectForSupplyAndAllTimeHigh } from "../Interface/CryptoSupply";

export const Cryptocurrencies = () => {
  const [cryptoData, setCryptoData] =
    useState<RootObjectForCryptoCurrencies | null>(null);

  //using the use Effect hook to set the crypto cap data api
  useEffect(() => {
    const getCryptoData = async () => {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
          "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
        },
      };
      const coinAmount = 20;

      const url = `/coinranking/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=${coinAmount}&offset=0`;

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        if (!response.ok) {
          throw new Error(
            `HTTP Error: ${response.status} ${response.statusText}`
          );
        }
        setCryptoData(result as RootObjectForCryptoCurrencies);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    getCryptoData();
  }, []);

  return (
    <>
      <div className="cryptoTableContainer">
        {/* header container */}
        <header>
          {/* crypto container */}
          <div className="crypto">
            <div className="cryptocurrencyCon">
              <img src={CryptoCurrency} alt="image of crypto dahboard" />
              <p className="font-normal leading-3">Cryptocurrency</p>
            </div>
            <div className="category">
              <img src={Category} alt="filter image" />
              <p className="font-normal leading-3">Categories</p>
            </div>
          </div>
          {/* filter container */}
          <div className="filterContainer">
            <div className="filterCon">
              <img src={filter} alt="filter image" />
              <p>Filters</p>
            </div>
            <div className="vCon">
              <div className="v">V</div>
              <img src={Display} alt="display" />
            </div>
          </div>
        </header>

        {/* main table */}
        <div className="table-container">
          {/* Only the desktop table */}
          <table className="coin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Coins</th>
                <th>Price</th>
                <th>24h</th>
                <th>24h Volume</th>
                <th>Market Cap</th>
                <th>Circulating Supply</th>
                <th>All Time High</th>
              </tr>
            </thead>
            <tbody>
              {cryptoData &&
                cryptoData.data.coins.map((coin, index) => (
                  <tr key={index}>
                    <td className="rowStyle font-normal">{index + 1}</td>
                    <td className="rowStyle coinName flex-row items-center font-normal">
                      {" "}
                      <img
                        src={coin.iconUrl}
                        className="coinImage"
                        alt="coin image"
                      />{" "}
                      {coin.name}
                    </td>
                    <td className="rowStyle font-normal">
                      <FormatPrice price={coin.price} />
                    </td>
                    <CoinChangeDisplay coin={coin} />
                    {/* <CoinChangeDisplay coin={coin} /> */}
                    <td className="rowStyle font-normal">
                      $
                      {coin["24hVolume"]
                        ? Number(coin["24hVolume"]).toLocaleString("en-US")
                        : "N/A"}
                    </td>
                    <td className="rowStyle font-normal">
                      {coin.marketCap
                        ? Number(coin.marketCap).toLocaleString()
                        : "N/A"}
                    </td>
                    <CoinCirculatingSupply coin={coin} />
                    <CoinAllTimeHigh coin={coin} />
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

// price component
export const FormatPrice = ({ price }: { price: string }) => {
  const numPrice = parseFloat(price);
  if (numPrice >= 1) {
    // For prices greater than or equal to 1, use 2 decimal places
    return (
      <span>
        $
        {numPrice.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </span>
    );
  } else {
    // For prices less than 1, use up to 6 decimal places
    return (
      <span>
        $
        {numPrice.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 6,
        })}
      </span>
    );
  }
};

// component to display the changes in 24hr
export const CoinChangeDisplay = ({ coin }: { coin: Coin }) => {
  const [percentageChange, setPercentageChange] = useState<number>(0);
  const [color, setColor] = useState<string>("");

  useEffect(() => {
    const change = Number(coin.change);
    setPercentageChange(Math.abs(change));
    setColor(change >= 0 ? "#16C784" : "#EA3943");
  }, [coin.change]); // Dependencies array ensures this effect runs only when coin.change updates

  return (
    <td
      style={{ color: color }}
      className="rowStyle font-normal flex-row items-center justify-center"
    >
      {percentageChange.toFixed(2)}%
    </td>
  );
};

export const CoinCirculatingSupply = ({ coin }: { coin: Coin }) => {
  const [circulatingSupply, getCirculatingSupply] =
    useState<RootObjectForSupplyAndAllTimeHigh | null>(null);

  useEffect(() => {
    const getCoinCirculatingSupply = async () => {
      try {
        const coinUUID = coin.uuid;
        const url = `/coinranking/coin/${coinUUID}?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h`;
        const options = {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
            "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
          },
        };
        const response = await fetch(url, options);
        const data = await response.json();
        getCirculatingSupply(data as RootObjectForSupplyAndAllTimeHigh);
      } catch (error) {
        console.error(`Failed to fetch data :`, error);
        return null;
      }
    };
    getCoinCirculatingSupply();
  }, [coin]);

  return (
    <>
      {circulatingSupply ? (
        <td className="rowStyle font-normal">
          {Number(
            circulatingSupply?.data.coin.supply.circulating
          ).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </td>
      ) : (
        <p>Loading Data.....</p>
      )}
    </>
  );
};

export const CoinAllTimeHigh = ({ coin }: { coin: Coin }) => {
  const [allTimeHigh, getAllTimeHigh] =
    useState<RootObjectForSupplyAndAllTimeHigh | null>(null);

  useEffect(() => {
    const getCoinCirculatingSupply = async () => {
      try {
        const coinUUID = coin.uuid;
        const url = `/coinranking/coin/${coinUUID}?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h`;
        const options = {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
            "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
          },
        };
        const response = await fetch(url, options);
        const data = await response.json();
        getAllTimeHigh(data as RootObjectForSupplyAndAllTimeHigh);
      } catch (error) {
        console.error(`Failed to fetch data :`, error);
        return null;
      }
    };
    getCoinCirculatingSupply();
  }, [coin]);
  // Check if the price exists before rendering FormatPrice, providing a fallback to "0" if not present.
  const price = allTimeHigh?.data.coin.allTimeHigh.price ?? "0";

  return (
    <>
      {allTimeHigh ? (
        <td className="rowStyle font-normal">
          <FormatPrice price={price} />{" "}
        </td>
      ) : (
        <p>Loading Data....</p>
      )}
    </>
  );
};
