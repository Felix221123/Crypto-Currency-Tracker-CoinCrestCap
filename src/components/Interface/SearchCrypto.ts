export interface RootObjectSearchCoin {
  status: string;
  data: Data;
}

export interface Data {
  coins: Coin[];
  exchanges: Exchange[];
  markets: Market[];
}

export interface Market {
  uuid: string;
  baseSymbol: string;
  quoteSymbol: string;
  baseUuid: string;
  quoteUuid: string;
  exchangeIconUrl: string;
  exchangeName: string;
  exchangeUuid: string;
  recommended: boolean;
}

export interface Exchange {
  uuid: string;
  iconUrl: string;
  name: string;
  recommended: boolean;
}

export interface Coin {
  uuid: string;
  iconUrl: string;
  name: string;
  symbol: string;
  price: string;
}