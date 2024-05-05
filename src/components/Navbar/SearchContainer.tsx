import React, { useState, useRef, useEffect, ReactNode } from "react";
import SearchIcon from "/assets/svg/search.svg";
import MenuClose from "/assets/svg/menuclose.svg";
import "./Navbar.css";
import { RootObjectSearchCoin } from "../Interface/SearchCrypto";
import { FormatPrice } from "../Base/Cryptocurrencies";
import { debounce } from "lodash";
import { GreenBull } from "../Icons/GreenBull";
import { RedBear } from "../Icons/RedBear";

interface SearchComponentProps {
  isActive: boolean;
  onClose: () => void;
}

export const SearchComponent: React.FC<SearchComponentProps> = ({
  isActive,
  onClose,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] =
    useState<RootObjectSearchCoin | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // hook to handle clicks outside the container
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isActive &&
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActive, onClose]);

  // useEffect to show the active container
  useEffect(() => {
    if (isActive && searchContainerRef.current) {
      const inputElement = searchContainerRef.current.querySelector("input");
      inputElement?.focus();
    }
  }, [isActive]);

  // Effect to auto-focus the input when the search container is shown
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // Focus the input field
    }
  }, []); // Dependency on the searchContainer state

  // calling the debounce useEffect
  useEffect(() => {
    // Call the debounced function with the current inputValue
    if (inputValue) {
      debouncedSearch(inputValue, setSearchResults, setLoading, setError);
    }
  }, [inputValue]);

  console.log(searchResults);

  return (
    <div
      className={`searchContainer ${isActive ? "active" : ""}`}
      ref={searchContainerRef}
    >
      <div className="searchArea">
        <label htmlFor="cryptoSearch">
          <img src={SearchIcon} alt="" />
          <input
            type="text"
            placeholder="Search"
            className="font-normal"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            ref={inputRef}
          />
          <img
            src={MenuClose}
            alt="close btn of the search"
            onClick={onClose}
          />
        </label>
      </div>

      {/* search results displayed */}
      {searchResults && searchResults.data.coins.length > 0 && (
        <div className="searchResultsContainer">
          <div className="scrollable">
            {searchResults.data.coins.map((coin, index) => (
              <div className="coinDisplayContainer" key={index}>
                <div className="coinDisplayName">
                  <img src={coin.iconUrl} alt="coin image" />
                  <p className="coinName font-normal leading-5">{coin.name}</p>
                </div>
                <p className="coinPrice">
                  { coin.price === "NaN" ? "$0" : <FormatPrice price={coin.price} />}  {" "}
                  <CoinChangeDisplayForSearch coinUUID={coin.uuid} />
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* error container */}
      {error && (
        <div className="error-container">
          <p className="error-message text-center font-bold leading-4">
            ( 4_0_4 )
          </p>
          <p id="error-txt" className="text-center font-normal">
            {error}
          </p>
        </div>
      )}

      {/* Placeholder for search animation */}
      {loading && (
        <div className="preloader-container">
          <div className="wrap">
            <div className="ball hidden"></div>
            <div className="ball hidden"></div>
            <div className="ball hidden"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export const CoinChangeDisplayForSearch = ({
  coinUUID,
}: {
  coinUUID: string;
}) => {
  const [percentageChange, setPercentageChange] = useState<number>(0);
  const [color, setColor] = useState<string>("");
  const [icon, setIcon] = useState<ReactNode>("");

  useEffect(() => {
    const getPercentageForCoin = async () => {
      try {
        // const coinUUID = coin.uuid;
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
        if (data.status === "success" && data.data.coin.change) {
          const change = parseFloat(data.data.coin.change);
          setPercentageChange(Math.abs(change));
          setColor(change >= 0 ? "#16C784" : "#EA3943");
          setIcon(change >= 0 ? <GreenBull /> : <RedBear />);
        }
      } catch (error) {
        console.error(`Failed to fetch data :`, error);
        return null;
      }
    };
    getPercentageForCoin();
  }, [coinUUID]);

  return (
    <div style={{ color: color }} className="changePercentage">
      {icon}
      {percentageChange.toFixed(2)}%
    </div>
  );
};

interface SetSearchResults {
  (results: RootObjectSearchCoin | null): void;
}

interface SetLoading {
  (loading: boolean): void;
}

interface SetError {
  (error: string | null): void;
}

// Define the debounce function outside of the component or inside if it uses props or state
const debouncedSearch = debounce(
  async (
    query: string,
    setResults: SetSearchResults,
    setLoading: SetLoading,
    setError: SetError
  ) => {
    if (!query.trim()) {
      setResults(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const url = `/coinranking/search-suggestions?referenceCurrencyUuid=yhjMzLPhuIDl&query=${query}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const data = (await response.json()) as RootObjectSearchCoin;
      if (data && data.data.coins.length > 0) {
        setResults(data);
      } else {
        setError("Coin not found");
        setResults(null);
      }
    } catch (error) {
      setError(`Failed to fetch data: ${error}`);
      console.error(`Failed to fetch data:`, error);
    }
    setLoading(false);
  },
  200
);
