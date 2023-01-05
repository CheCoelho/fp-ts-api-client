## fp-ts api-client
This package contains a module for making HTTP requests to a specified API using the fp-ts library. It contains two main modules:

### api-client.ts
This module contains functions for making HTTP requests to a specified API using axios. The get function is the main function for making GET requests, and it takes in a route (the endpoint of the API), options (an object containing the host of the API), an optional id (a string representing an item ID), and an optional params (an object containing query parameters). The _constructUrl function is a helper function that constructs the full URL for the request by combining the route, id, and params.

### index.ts
This module contains an example of how to use the get function from api-client.ts to make a GET request to the specified API. The main function constructs the URL for the request using the _constructUrl function, then makes the request using the get function. The data from the response is logged to the console.

### types.ts
This module contains type definitions for the variables and functions used in the other modules.

### constants.ts
This module contains a constant object apiOptions, which contains the host of the API.


### First, install the dependencies: 
```
npm i
```
### To run the index.ts file: 

```
npm run start
```
