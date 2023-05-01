# Watchers-app

for CS673

Please run the following steps sequentially. 
The database must be run before running the application to avoid errors.
## How to run the database 

Run the following from the 'watchers-app' directory
1. npx prisma generate
2. npx prisma db push
3. npm run express-build
4. npm run express-run

It should say 'Server listerining on port 3000'
This means the database is running and you're good to go.

## How to run the application

Run the following from the 'watchers-app' directory 
1. npm install
2. npm run build
3. ng serve -o

This will open a localhost window in your browser that is running the app. 
It is automatically attached to the database.

Refer to [here](user-data-design.md) for info about the user database.