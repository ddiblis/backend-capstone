# backend-capston

A simple backend that uses a docker image combined with sqlLite for querying and fetching data using complex table sql table structures.

## Installation

To install simply run 

`npm install`

Then 

`npm run start`

## Database

Using knex one can run migrations and seeding commands, however predetermined commands have been included in the package.json file

For migrations simply run:

`npm run make:critics`

`npm run make:movies`

`npm run make:movies_theaters`

`npm run make:reveiws`

`npm run make:theaters`

or for all migrations at one use:

`npm run migrate`

for seeding use:

`npm run seed`

