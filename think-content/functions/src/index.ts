import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const nodemailer = require("nodemailer");
admin.initializeApp();

// welcome email upon signup
exports.sendWelcomeEmail = functions.firestore
  .document("users/{userID}")
  .onCreate((snap: any, context: any) => {
    console.log("email id" + snap.data().email);

    let name = snap.data()?.displayName || snap.data().email?.split("@")[0];

    let message = `<!DOCTYPE html>
    <html>
    <head>
      <title>Welcome to Think Content</title>
    </head>
    <body>
      <h2>Welcome to Think Content!</h2>
      <p>Dear ${name},</p>
      <p>Thank you for signing up for Think Content. We are excited to have you on board!</p>
      <p>With Think Content, you can collaborate with teams, manage projects, and create amazing content.</p>
      <p>Should you have any questions or need assistance, please feel free to reach out to our support team.</p>

      <hr style="border:none; border-top:1px solid #e5e5e5; margin:20px 0;" />
    
      <p>
        Best regards,<br />
        The Think Content Team
      </p>
    </body>
    </html>`;

    const mailOptions = {
      from: functions.config().email.username,
      to: snap.data().email,
      subject: "Thank you for joining Think Content!",
      html: message,
    };

    var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: functions.config().email.username,
        pass: functions.config().email.password,
      },
    });
    

    return transporter.sendMail(mailOptions, (error: any, data: any) => {
      if (error) {
        console.log("Inside error block" + error);
        return;
      }
      console.log("Email sent!");
    });
  });

// invite email when for users
exports.sendInviteEmail = functions.firestore
  .document("users/{userID}/invites/{workspaceID}")
  .onCreate((snap: any, context: any) => {
    console.log("email id" + snap.data().email);

    let message = `<!DOCTYPE html>
    <html>
    <head>
      <title>Email Invitation</title>
    </head>
    <body>
      <p><strong>${snap.data().invitedBy} invited you to the workspace ${
      snap.data().workspaceName
    }.</strong></p>
      <p>Click the button below to view the invitation:</p>
      <p>
        <a href="http://localhost:3000/invite/${snap.data().workspaceId}">
          <button style="padding: 10px 20px; background-color: #915EFF; color: white; border: none; cursor: pointer;">
            View Invitation
          </button>
        </a>
      </p>
      <hr style="border:none; border-top:1px solid #e5e5e5; margin:20px 0;" />

      <p>
        Best regards,<br />
        The Think Content Team
      </p>
    </body>
    </html>`;

    const mailOptions = {
      from: functions.config().email.username,
      to: snap.data().inviteEmail,
      subject: "You've been invited to join a workspace!",
      html: message,
    };

    var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: functions.config().email.username,
        pass: functions.config().email.password,
      },
    });

    return transporter.sendMail(mailOptions, (error: any, data: any) => {
      if (error) {
        console.log("Inside error block" + error);
        return;
      }
      console.log("Email sent!");
    });
  });