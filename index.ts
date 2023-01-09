import * as O from "fp-ts/lib/Option";
import * as TE from "fp-ts/lib/TaskEither";
import { pipe } from "fp-ts/lib/function";
import { _get, _post, _delete } from "./api-client";
import { apiOptions, postExample } from "./constants";
import { ItemID, Params, PostExample } from "./types";

export const getProduct = async (id: ItemID) => {
  console.log("Making a get request for a single product");
  const rawRes = pipe(
    _get("products", apiOptions, O.some(id), O.none),
    TE.chain((response) => TE.right(response.data))
  )();
  console.log(await rawRes);
};

export const getProductList = async (params: Params) => {
  console.log("Making a get request for a list of products");
  const rawRes = pipe(
    _get("products", apiOptions, O.none, O.some(params)),
    TE.chain((response) => TE.right(response.data))
  )();
  console.log(await rawRes);
};

export const createProduct = async (data: PostExample) => {
  console.log("Making a post request to create a product");
  const rawRes = pipe(
    _post("products/add", apiOptions, data),
    TE.chain((response) => TE.right(response.data))
  )();
  console.log(await rawRes);
};

export const deleteProduct = async (id: ItemID) => {
  console.log("Making a delete request to a single product");
  const rawRes = pipe(
    _delete("products", apiOptions, O.some(id)),
    TE.chain((response) => TE.right(response.data))
  )();
  console.log(await rawRes);
};

const main = async () => {
  try {
    await getProduct("1");
    await createProduct(postExample);
    await getProduct("100");
    await getProductList({ category: "smartphones" });
    await deleteProduct("100");
  } catch (error) {
    console.error(error);
  }
};

main();
