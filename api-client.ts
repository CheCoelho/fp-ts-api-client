import * as TE from "fp-ts/lib/TaskEither";
import { pipe } from "fp-ts/lib/function";
import * as A from "fp-ts/lib/Array";
import * as O from "fp-ts/lib/Option";
import * as R from "fp-ts/lib/Record";
import * as E from "fp-ts/lib/Either";

export interface APIOptions {
  HOST: "https://dummyjson.com/";
}

//MOVE TO TYPES
export interface EmptyTokenData {
  access: null;
  refresh: null;
}
export interface TokenData {
  access: string;
  refresh: string;
}
type ItemID = string; //Create a type that extends all possible ids
type RouteOptions = "products";
type ApiMethod = "GET" | "POST";
type Params = Record<ParamsKey, ItemID>;
type ParamsKey = "product_id";

const _createBaseUrl = (options: APIOptions): string => `${options.HOST}`;

const _createRequestInit = (method: ApiMethod): RequestInit => {
  return {
    method: method,
    mode: "cors" as RequestMode,
    headers: {
      "Content-type": "application/json",
    } as HeadersInit,
  };
};

// const __constructUrlParams = (params: Params): string => {
//   const keys = Object.keys(params);
//   let urlParams: string = "";

//   console.log("RECEIVED PARAMS: ", params);

//   keys.map((k) => {
//     urlParams = urlParams + `${k}=${params[k]}&`;
//   });
//   console.log("constructed url params: ", urlParams);
//   return urlParams;
// };

const _constructUrlParams = (params: Params) =>
  pipe(
    params,
    R.keys,
    A.map((key) => `${key}=${params[key]}&`),
    A.reduce("", (acc, curr) => acc + curr)
  );

const _constructUrl = (
  route: RouteOptions,
  options: APIOptions,
  id: O.Option<ItemID>,
  params: O.Option<Params>
): string =>
  pipe(
    O.fromNullable(id),
    O.map((i) => i + "/"),
    O.getOrElse(() => ""),
    (idPath) =>
      pipe(
        params,
        O.map((p) => "?" + _constructUrlParams(p)),
        O.getOrElse(() => ""),
        (urlParams) =>
          _createBaseUrl(options) + "/" + route + "/" + idPath + urlParams
      )
  );
// const __constructUrl = (
//   route: RouteOptions,
//   options: APIOptions,
//   id: ItemID | null,
//   params: Params | null
// ) => {
//   let urlParams: string;
//   let idPath: string;
//   const baseUrl = _createBaseUrl(options);
//   if (id) {
//     idPath = id + "/";
//   } else {
//     idPath = "";
//   }
//   if (params) {
//     urlParams = "?" + _constructUrlParams(params);
//   } else {
//     urlParams = "";
//   }
//   const url = baseUrl + "/" + route + "/" + idPath + urlParams;
//   console.log("URL CONSTRUCTED: ", url);
//   return url;
// };

//Keep these functions here and add request specific routes
export const makeRequest = async (
  method: ApiMethod,
  route: RouteOptions,
  apiOptions: APIOptions,
  params: Params | null = null,
  id: ItemID | null = null
) => {
  console.log(
    `Making Request to ${route} with ${id ? "ID" : "filter params"} ${
      id ? id : params?.product_id
    }`
  );
  try {
    const requestInit = _createRequestInit(method);
    const url = _constructUrl(
      route,
      apiOptions,
      O.fromNullable(id),
      O.fromNullable(params)
    );
    console.log("Making Request: ", url, requestInit);
    const response = await fetch(url, requestInit);
    console.log("RESPONSE: ", response);
    return response;
  } catch (error) {
    console.error(error);
    return error as Error;
  }
};

export const _makeRequest = (
  method: ApiMethod,
  route: RouteOptions,
  apiOptions: APIOptions,
  params: Params | null = null,
  id: ItemID | null = null
) =>
  pipe(
    TE.tryCatch(
      () =>
        fetch(
          _constructUrl(
            route,
            apiOptions,
            O.fromNullable(id),
            O.fromNullable(params)
          ),
          _createRequestInit(method)
        ),
      (error) => TE.left(new Error(error as string))
    )
    // TE.chain((response) =>
    //   TE.fromEither(
    //     TE.map((responseStatus) => new Error(responseStatus), response.ok)
    //   )
    // )
  );
