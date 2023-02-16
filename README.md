# Storefront Backend Project

## Getting Started
#### Instructions
Run `yarn` in your terminal at the project root to install dependencies. 
Create databases `storefront` and `storefront_test` in postgresql
Run `yarn test` for tests.
Run `yarn watch` to spin up the server on `PORT 3000`
Database port is `5432`
Note that no mock data was added and tests are run in a precise order that creates the mock data.

#### List of Environment variables used
- PGHOST
- PGUSER
- PGPASSWORD
- PGDATABASE
- PGDATABASETEST
- ENV
- SALTRE
- PEPPRE
- TOKEN_SECRET

## Used Technologies
This application uses the following libraries:
- Postgres for the database (node-postgres as interface)
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Steps to Completion

### 1. Plan to Meet Requirements

In this repo there is a `REQUIREMENTS.md` document which outlines what this API needs to supply for the frontend, as well as the agreed upon data shapes to be passed between front and backend. This is much like a document you might come across in real life when building or extending an API. 

Your first task is to read the requirements and update the document with the following:
- RESTful route for each endpoint has been added to the `REQUIREMENTS.md` document along with the HTTP verbs.

- Database schema has been added to the `REQUIREMENTS.md` document taking note to account for various relationships.

### 2.  DB Creation and Migrations
Sensitive information has been hashed with bcrypt.

### 3. Models
Create the models for each database table. The methods in each model map to the endpoints in `REQUIREMENTS.md` and were tested with Jasmine.

### 4. Express Handlers
Route incoming requests to the correct model method. Endpoints created match up with the enpoints listed in `REQUIREMENTS.md`. Endpoints have tests and are CORS enabled. 

### 5. JWTs
JWT functionality has been added making sure that JWTs are required for the routes listed in `REQUIUREMENTS.md`.

### 6. QA and `README.md`

Project spins up and run without errors.
