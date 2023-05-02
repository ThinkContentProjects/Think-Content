import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
const nodemailer = require("nodemailer");

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
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "lucasradovan@gmail.com",
    pass: "llsxkrivijevbdfr",
  },
});

exports.sendWelcomeEmail = functions.firestore
  .document("users/{userID}")
  .onCreate((snap: any, context: any) => {
    console.log("email id" + snap.data().email);

    let message = "Hello " + (snap.data()?.displayName || snap.data().email?.split("@")[0]) + ",";
    message += "<br>Thank you for signing up for Think Content!";

    const mailOptions = {
      from: "lucasradovan@gmai.com",
      to: snap.data().email,
      subject: "Thank you for joining Think Content!",
      html: message,
    };

    return transporter.sendMail(mailOptions, (error: any, data: any) => {
      if (error) {
        console.log("Inside error block" + error);
        return;
      }
      console.log("Email sent!");
    });
  });

  exports.sendInviteEmail = functions.firestore
  .document("users/{userID}/invites/{workspaceID}")
  .onCreate((snap: any, context: any) => {
    console.log("email id" + snap.data().email);

    let message = "Hello,";
    message += `<br>You've been invite to join the workspace "${snap.data().workspaceName}."`;
    message += "<br>Click on the link to view the invitation: ";
    message += `<a href="http://localhost:3000/invite/${snap.data().workspaceId}">workspace</a>`

    const mailOptions = {
      from: "lucasradovan@gmai.com",
      to: snap.data().inviteEmail,
      subject: "You've been invited to join a workspace!",
      html: message,
    };

    return transporter.sendMail(mailOptions, (error: any, data: any) => {
      if (error) {
        console.log("Inside error block" + error);
        return;
      }
      console.log("Email sent!");
    });
  });