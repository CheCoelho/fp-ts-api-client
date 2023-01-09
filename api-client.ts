import * as TE from "fp-ts/lib/TaskEither";
import { pipe } from "fp-ts/lib/function";
import * as A from "fp-ts/lib/Array";
import * as O from "fp-ts/lib/Option";
import * as R from "fp-ts/lib/Record";
import axios, { AxiosResponse } from "axios";
import { APIOptions, Params, RouteOptions, ItemID, PostExample } from "./types";

const _createBaseUrl = (options: APIOptions): string => `${options.HOST}`;
const config = {
  headers: {
    "Content-type": "application/json",
  },
};

const _constructUrlParams = (params: Params): string =>
  pipe(
    params,
    R.keys,
    A.map((key) => `${key}=${R.lookup(key, params)}&`),
    A.reduce("", (acc, curr) => acc + curr)
  );

export const _constructUrl = (
  route: RouteOptions,
  options: APIOptions,
  id: O.Option<ItemID>,
  params: O.Option<Params>
): string => {
  const idPath = O.fold(
    () => "",
    (i) => `/${i}`
  )(id);
  const urlParams = O.fold(
    () => "",
    (p: Params) => `?${_constructUrlParams(p)}`
  )(params);
  return `${_createBaseUrl(options)}${route}${idPath}${urlParams}`;
};

export const _get = (
  route: RouteOptions,
  options: APIOptions,
  id: O.Option<ItemID>,
  params: O.Option<Params>
): TE.TaskEither<Error, AxiosResponse> =>
  TE.tryCatch(
    () => axios.get(_constructUrl(route, options, id, params), config),
    (error) => new Error(error as string)
  );

export const _post = (
  route: RouteOptions,
  options: APIOptions,
  data: PostExample
): TE.TaskEither<Error, AxiosResponse> =>
  TE.tryCatch(
    () =>
      axios.post(_constructUrl(route, options, O.none, O.none), data, config),
    (error) => new Error(error as string)
  );

export const _patch = (
  route: RouteOptions,
  options: APIOptions,
  data: Partial<PostExample>
): TE.TaskEither<Error, AxiosResponse> =>
  TE.tryCatch(
    () =>
      axios.patch(_constructUrl(route, options, O.none, O.none), data, config),
    (error) => new Error(error as string)
  );

export const _delete = (
  route: RouteOptions,
  options: APIOptions,
  id: O.Option<ItemID>
): TE.TaskEither<Error, AxiosResponse> =>
  TE.tryCatch(
    () => axios.delete(_constructUrl(route, options, id, O.none), config),
    (error) => new Error(error as string)
  );
