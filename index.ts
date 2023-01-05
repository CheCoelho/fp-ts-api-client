import * as O from "fp-ts/lib/Option";
import * as TE from "fp-ts/lib/TaskEither";
import { pipe } from "fp-ts/lib/function";
import { _constructUrl, get } from "./api-client";
import { apiOptions } from "./constants";

const main = async () => {
  console.log("Running ");
  //The following 10 lines of code are purely for logging purposes
  console.log(
    "Making a get request to URL: ",
    // _constructUrl("products", apiOptions, O.some("1"), O.none)
    _constructUrl(
      "products",
      apiOptions,
      O.none,
      O.some({ category: "smartphones" })
    )
  );
  const rawRes = pipe(
    //Set the route and the produce ID below. The last argument to the
    //_constructUrl function is for query param

    //To get a product with a specific ID
    get("products", apiOptions, O.some("p"), O.none),

    //To get a list of products that matches the query params
    // get("products", apiOptions, O.none, O.some({ category: "smartphones" })),
    TE.chain((response) => TE.right(response.data))
  );
  console.log("Printing data from response: ", await rawRes());
};

main();
