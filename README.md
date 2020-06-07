#This is the backend for Ecoleta -

A platform (web and mobile) that creates a bridge between people who need to dispose of electronic waste and the collection companies.

##Database Migration

The backend uses SQLite 3 with Knex library as query builder

###To do the database migration
Run
`npm run knex:migrate`

###To seed the database
Run
`npm run knex:seed`

##Recommended
Consider to use `SQLite Explorer` plugin in VS Code in order to see the tables
