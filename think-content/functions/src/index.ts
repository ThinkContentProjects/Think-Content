import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
const nodemailer = require('nodemailer');

admin.initializeApp();
const db = admin.firestore();

export const createUserDocument = functions.auth
  .user()
  .onCreate(async (user) => {
    db.collection("users")
      .doc(user.uid)
      .set(JSON.parse(JSON.stringify(user)));
  });


var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'lucasradovan@gmail.com',
        pass: 'llsxkrivijevbdfr'
    }
});

exports.sendEmail = functions.firestore.document('users/{userID}')
.onCreate((snap: any, context: any) => {
  console.log("email id" + snap.data().email);
  let message = "From : " + snap.data
})
