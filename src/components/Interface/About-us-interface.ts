export interface RootObjectOfMarketCap {
  market_cap_usd: number;
  volume_24h_usd: number;
  bitcoin_dominance_percentage: number;
  cryptocurrencies_number: number;
  market_cap_ath_value: number;
  market_cap_ath_date: string;
  volume_24h_ath_value: number;
  volume_24h_ath_date: string;
  volume_24h_percent_from_ath: number;
  volume_24h_percent_to_ath: number;
  market_cap_change_24h: number;
  volume_24h_change_24h: number;
  last_updated: number;
}


export interface RootObjectOfTrendingCoins {
  coins: TrendingCoinsProps[];
}

export interface RootObject {
  status: string;
  data: Data;
}

export interface TrendingCoinsProps {
  item: Item;
}



export interface Item {
  id: string;
  coin_id: number;
  name: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  small: string;
  large: string;
  slug: string;
  price_btc: number;
  score: number;
  data: Data;
}

export interface Data {
  price: number;
  price_btc: string;
  price_change_percentage_24h: Pricechangepercentage24h;
  market_cap: string;
  market_cap_btc: string;
  total_volume: string;
  total_volume_btc: string;
  sparkline: string;
  content: Content | null;
}

export interface Content {
  title: string;
  description: string;
}


export interface RootObjectMarketPercentageCap {
  data: CryptoDataSetForMarketPercentage;
}

export interface CoinInfo {
  name: string;
  large: string;
  symbol: string;
}

export interface CryptoDataSetForMarketPercentage {
  active_cryptocurrencies: number;
  upcoming_icos: number;
  ongoing_icos: number;
  ended_icos: number;
  markets: number;
  total_market_cap: Totalmarketcap;
  market_cap_percentage: MarketCapPercentage;
  market_cap_change_percentage_24h_usd: number;
  updated_at: number;
}

export interface MarketCapPercentage {
  btc: number;
  eth: number;
  usdt: number;
}

export interface Totalmarketcap {
  usd: number;
  
}
export interface Pricechangepercentage24h {
  usd: number;
}

export interface CoinSearchGecko{
  id: string
  name: string
  api_symbol: string
  symbol: string
  market_cap_rank: number
  thumb: string
  large: string
  
}











