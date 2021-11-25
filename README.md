## Sky Market Installation Guide

- Note: Make sure you have NPM installed on your machine

1. Clone the github repository
2. Change to the project's repository
3. Run `npm install` from terminal (may need to be changed to root if shown errors)
4. Install mongoDB locally through this [guide](https://docs.mongodb.com/manual/administration/install-community/). Typically your mongoDB URI should be in this format `mongodb://<ip>:<port>/<dbname>`
5. Create a .env file with the following keys: `SECRET_KEY={#anyvalueyoulike}` `DB_URI={#yourmongodbURI}`
6. Run the script `node routes/script.js` to insert mock data into your db
7. Run the application by entering the command: `npm run dev`
8. Visit `http://localhost:3000` in the browser and starts using it

### Hope you enjoy our application
