import { Chain } from "viem";
import { createConfig } from "wagmi";

export type IAddress = `0x${string}`;

export type INumberString = `${number}`;

export interface IToken {
  name: string;
  address: IAddress;
  logo: string;
  decimal: INumberString;
}

export interface INetworkPayment {
  name: string;
  logo: string;
  nativeCurrency: IToken;
  receiverAddress: IAddress;
  smartContractAddress: IAddress;
  rpcUrl: string;
  signatureExpiry: number;
  maxBlockPerBatch: number;
  confirmationBlock: number;
  sleepTimeBetweenCrawling: number;
  sleepTimeOnceFailed: number;
  initialBlockNumber: number;
  acceptTokens: IToken[];
  explorerUrl?: string;
}

export interface IChain extends Chain {
  receiverAddress: IAddress;
  smartContractAddress: IAddress;
  acceptTokens: IToken[];
}

export interface INetworkResponse {
  [key: INumberString]: INetworkPayment;
}

export interface IPriceConversion {
  id: number;
  symbol: string;
  name: string;
  amount: number;
  last_updated: string;
  quote: {
    [key: string]: {
      price: number;
      last_updated: string;
    };
  };
}

export interface IPriceConversionResponse {
  [key: string]: IPriceConversion;
}

export type IWagmiConfig = ReturnType<typeof createConfig>;
