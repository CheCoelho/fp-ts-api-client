import * as z from "zod";

import { apiOptions as apiOptionsContant } from "./constants";

// define parsers and validators for each argument
const RouteOptionsSchema = z.enum(["products"]);
const ApiMethodSchema = z.enum(["GET", "POST"]);
const ItemIDSchema = z.string();
const ParamsKeySchema = z.enum(["category"]);
const ParamsSchema = z.record(ParamsKeySchema);
const DataSchema = z.record(z.string());
const ApiOptionsSchema = z.object({
  HOST: z.string().url(),
});

// use the defined schemas to parse and validate the arguments
const route = RouteOptionsSchema.parse("products"); // returns "products"
const method = ApiMethodSchema.parse("GET"); // returns "GET"
const id = ItemIDSchema.parse("1"); // returns "1"
const params = ParamsSchema.parse({ category: "smartphones" }); // returns { category: "smartphones" }
const data = DataSchema.parse({ name: "Product 1" }); // returns { name: "Product 1" }
const apiOptions = ApiOptionsSchema.parse(apiOptionsContant); // returns { name: "Product 1" }
