import * as O from "fp-ts/lib/Option";
import * as TE from "fp-ts/lib/TaskEither";
import { pipe } from "fp-ts/lib/function";
import { _constructUrl, get } from "./api-client";
import { apiOptions } from "./constants";

const main = async () => {
  console.log("Running ");
  console.log(
    "Making a get request to URL: ",
    //Set the route and the produce ID below. The last argument to the
    //_constructUrl function is for query params
    _constructUrl("products", apiOptions, O.some("1"), O.none)
  );
  const rawRes = pipe(
    get("products", apiOptions, O.some("p"), O.none),
    TE.chain((response) => TE.right(response.data))
  );
  console.log("Printing data from response: ", await rawRes());
};

main();
