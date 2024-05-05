export interface DataProps {
  coins: SearchedCoinProps[];
}

export interface SearchedCoinProps {
  uuid: string;
  iconUrl: string;
  name: string;
  symbol: string;
  price: string;
}
