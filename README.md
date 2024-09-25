
<br />
<div align="center">
  <h2 align="center"> Personal and Loan Details Recorder</h2>
</div>

## About The Project

This Project is a Personal and Loan-related Details Recorder and Calculator through a multi-step form. It includes the feature such as User can provide
their Personal and Loan Details through a multi-step form. After the form is submitted, server will process Loan information and provide the  Loan offers from multiple lenders based on the submitted details.

## How to Run the Project

### Run with Docker

1. Clone the project:

```sh
git clone <repository-url>
cd <project-directory>
```

2. Start the project using Docker Compose:

```sh
docker-compose up
```

### Run without docker

1. Clone the project:

```sh
git clone <repository-url>
cd <project-directory>
```

2. Move into the client directory and run the following command

```sh
 cd client
 npm install
 npm run start
```
3. Move into the server directory and run the following command

```sh
 cd server
 npm install
 npm run dev
```

## Runing the tests

1. To run tests for client, move into the client directory and run the following command

```sh
 npm run cypress:test
```
2. To run tests for server, move into the server directory and run the following command

```sh
 npm run test
```


## Api Documentation

  API Documentation is provided using swagger. You can view and test all the endpoints by visiting the following URL in the browser window:

  [http://localhost:5000/api-docs/]

## Note

Client Side: The Project uses the React, typescript, react-hook-form, zod, SCSS, Cypress for client-side. For testing of client side, cypress is used to perform Integration tests.

Server Side: The Project uses the Express, typescript, class-validator, Jest for server-side. For testing of server-side, Jest and supertest is used to test API endpoints.
