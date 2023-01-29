# Database Server Tech Test

A small [express.js](https://expressjs.com/) database server that allows the user to:

- store key-value pairs on the server
- query the server for the value associated with a given key

using HTTP requests.

# Running the project

To run this project, first clone the repository and run

```bash
npm install
```

You can then start up the server on `localhost:4000` by running

```bash
npm run start
```

You can add a key-value pair to the server by sending a `PUT` request to `localhost:4000/set`, with the key-value pair as query parameters.
For example, sending

```
PUT localhost:4000/set?name=Thomas
```

will store the pair `name: Thomas` on the server.
Note that sending such a request for a key-value pair already stored in the server with a different value will overwrite the value stored on the server.
You can also make several pairs at once by chaining query parameters, eg:

```
PUT localhost:4000/set?name=Thomas&language=JavaScript
```

You can then query the database for the value of a given key by sending a `GET` request to the `localhost:4000/get` path with the query parameter `key` set to the key you want to retrieve.
For instance, to retrieve the value stored with the `name` key, send the following request

```
GET localhost:4000/get?key=name
```

The value will be stored in the `value` key of the JSON response.
Note you will get a `404 Not Found` status if the key isn't already in the database,
and you cannot chain any other query parameters to your request.

A full example using this server could look like

```bash
# Set the name and language keys
PUT localhost:4000/set?name=Thomas&language=JavaScript
# HTTP Response: STATUS 201 CREATED
# body: { message: "OK" }

# Get the language value stored in the server
GET localhost:4000/get?key=language
# HTTP Response: STATUS 200 OK
# body: { message: "OK", value: "JavaScript" }

# Fails if the key isn't set
GET localhost:4000/get?key=surname
# HTTP Response: STATUS 404 NOT FOUND
# body: { message: "Key "surname" not found" }
```

This server was tested using [Jest](https://jestjs.io/), as well as the [supertest](https://github.com/ladjs/supertest#readme) package.
To run the tests, run

```
npm run test
```

# Technical Details

The server logic is implemented using `express`, which is responsible for hosting the server and routing incoming requests.

We use express' `app.locals` object as our storage since it persists for the lifetime of the server, and can be accessed from the `req` object of any `express` route function (`req.app.locals`), making it visible to both our `PUT` and `GET` request controllers.

When our server starts up, we initialize `app.locals.memory` to an empty object.

When sending a `PUT /set` request, we call the `SetController.put` function.
We create/update keys in `app.locals.memory` with those in the query parameters of the request (accessed via the `req.query` object).

When sending a `GET /get` request, we call the `GetController.get` function.
We then query `app.locals.memory` for the given key, and either return the associated value, or respond with a `404` status if the key has not yet been set.

# Things to add

- Use a database, instead of `app.locals` for persistent storage, so that data isn't lost if the server crashes for instance.
  This would involve creating a model class which we would use to read/write from the database from inside our controllers.
- Currently the keys are global, meaning a different user can overwrite another user's keys.
  This also means that the server wouldn't respond well to multiple requests coming quickly, since these could race to overwrite keys in memory.
  To fix this, we could create user accounts (with authentication) so that several people can store / access their own keys independently.
  Note such a feature would hint towards using a database like [MongoDB](https://www.mongodb.com/), where keys could be directly stored inside the User's database entry.
