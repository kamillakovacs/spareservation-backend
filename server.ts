const path = require("path");
const admin = require("firebase-admin");
const serviceAccount = require("./service-account.json");
const dotenv = require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

const firebaseConfig = {
  credential: admin.credential.applicationDefault(),
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
};

admin.initializeApp(firebaseConfig);

const users = admin
  .database()
  .ref("/users/")
  .once("value")
  .then(function (snapshot) {
    var user = (snapshot.val() && snapshot.val()) || "Anonymous";
    console.log(user);
  });

// function writeUserData(userId, name, email, imageUrl) {
//   admin
//     .database()
//     .ref("users/" + userId)
//     .set({
//       username: name,
//       email: email,
//       profile_picture: imageUrl,
//     });
// }
