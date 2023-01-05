import { category } from "fp-ts";
import "lib.dom.d.ts";

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
export type RouteOptions = "products";
export type ApiMethod = "GET" | "POST";
export type Params = Record<ParamsKey, Category>;
export type ParamsKey = "category";

export type RequestInit = {
  method: string;
  mode: string;
  headers: HeadersInit;
};

export type RequestMode = "same-origin" | "no-cors" | "cors";

export type HeadersInit = Headers | string[][] | Record<string, string>;
