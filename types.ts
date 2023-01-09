import "lib.dom.d.ts";
import { _get, _post } from "./api-client";

export interface APIOptions {
  HOST: string;
}

export interface EmptyTokenData {
  access: null;
  refresh: null;
}
export interface TokenData {
  access: string;
  refresh: string;
}
export type ItemID = string; //Create a export type that extends all possible ids
export type Category = "smartphones";
export type RouteOptions = "products" | "products/add";
export type ApiMethod = "GET" | "POST";
export type Params = { [key: string]: Category };
export type ParamsKey = "category";

export type RequestInit = {
  method: string;
  mode: string;
  headers: HeadersInit;
};

export type RequestMode = "same-origin" | "no-cors" | "cors";

export type HeadersInit = Headers | string[][] | Record<string, string>;

export type Method = "GET" | "POST";

export interface ApiOptions {
  HOST: string;
}

export interface PostExample {
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}
