export type Rates = { [key: string]: number };
export type CurrencyIcons = { [key: string]: string };

// src/types.ts

export interface CurrencyRate {
  currency: string;
  price: number;
}

