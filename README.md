# web-calculator

Performs some basic calculations and functions and saves them in-memory server side. Uses webhooks to keep clients up-to-date on other client submitted calculations. Was going to implement a postgres store to allow for calculations to be saved even when the server has to be restarted but in the interest of time I'm just going to leave it as is for now. There will be updates in the future.

## Running It Locally

<s>The fastest way to get this running locally is with docker & docker-compose. To do it this way you must have both of these installed. Then in the root directory of this project just run `docker-compose up` (I would also recommend using the `-d` flag to detach logs from your console). Once this is has finished spinning up the client and athe server you should be able to navigate to http://localhost:4200 to see the app.</s>

Due to a recent push that added postgres to the service the previous instructions no longer work. I'm currently working on getting this fixed but in the mean time you can still run it locally, you just have to bring your own postgres instance and then modify the DATABASE_URL environment variable. Then run the docker-compose file like previously mentioned and you should be able to navigate to http://localhost:4200 to see the app

You can also find a deployed instance here: https://morning-reef-94143.herokuapp.com/
