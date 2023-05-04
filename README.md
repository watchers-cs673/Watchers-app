# Watchers-app

for CS673

Please run the following steps sequentially. 
The database must be run before running the application to avoid errors.
## How to run the database 

Run the following from the 'watchers-app' directory
1. npm run full-db

It should say 'Server listerining on port 3000'
This means the database is running and you're good to go.

## How to run the application

Run the following from the 'watchers-app' directory 
1. npm install
2. ng serve -o

** If it doesn't work, you may need to run 'npm run build', but this doesn't need to be run every time **

This will open a localhost window in your browser that is running the app. 
It is automatically attached to the database.

## How to run the unit test

Run the following from the 'watchers-app' directory 
1. ng test

Refer to [here](user-data-design.md) for info about the user database.