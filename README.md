This is a shell API with customizable user authentication and privileges. It is based off the example code here: https://github.com/firebase/functions-samples/tree/master/authenticated-json-api

Start off by initializing your Firebase Functions Project.
Then, set up the Admin SDK by following the directions here: https://firebase.google.com/docs/admin/setup 
Then, place the contents of this repository's functions folder into the newly initialized functions folder (replacing the original index.js file). The api should work by simply running 'npm run serve' or 'firebase serve --only functions'.

To practice with an authenticated user, I created a bare-bones signup/signin page (index.html) with it's associated scripts. You'll have to paste your Firebase Project config in the scripts section of the html. I serve this page using the VS Code extension Live Server: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer
After authenticating a user, their auth token can be pulled from the Chrome Inspection Console, and copied and pasted into the 'test.http' document to perform http requests. I use the VS Code extension REST Client for that, but I'm sure Postman works just fine.

Have fun!