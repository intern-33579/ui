const admin = require("firebase-admin");
var serviceAccount = require("./configfirebase.json");

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://intern-33579.firebaseio.com"
});
const db = admin.firestore();

export { db };
