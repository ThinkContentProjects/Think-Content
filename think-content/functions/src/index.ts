import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { Configuration, OpenAIApi } from "openai";
import axios from "axios";

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

    let message =
      "Hello " +
      (snap.data()?.displayName || snap.data().email?.split("@")[0]) +
      ",";
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
    message += `<br>You've been invite to join the workspace "${
      snap.data().workspaceName
    }."`;
    message += "<br>Click on the link to view the invitation: ";
    message += `<a href="http://localhost:3000/invite/${
      snap.data().workspaceId
    }">workspace</a>`;

    const mailOptions = {
      from: "lucasradovan@gmail.com",
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

// openai stuff
const DEFAULT_MODAL = "text-davinci-003";

const config = new Configuration({
  organization: process.env.ORGANIZATION,
  apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(config);

export const postGenerator = functions.https.onCall(async (data, context) => {
  const prompt = `Create an idea for an Instagram post based on the information below. The output should be composed of two sections: the creative and the caption with hashtags. Describe the creative and write the caption without any additional explanations.

  Company name: (Y)
  Company mission: (Y)
  Industry: (Y)
  Target Audience: (Y)
  Brand Message: (Y)
  
  Type of post and it's objective: ${data.type}
  Post format: ${data.format}
  Note (Ignore if empty): ${data.details}
  
  Creative: (Detailed description of the creative relevant to the type of post and its objective, post format, and company details)
  Caption: (Well-written and engaging caption that is relevant to the type of post and its objective, post format, and company details)
  
  (Please do not provide any explanations for the caption, or creative.)
  `;

  return openai
    .createCompletion({
      model: DEFAULT_MODAL,
      prompt: prompt,
      max_tokens: 100,
      temperature: 0,
    })
    .then((apiResponse) => {
      return apiResponse.data;
    });
});

export const picGenerator = functions.https.onCall(async (data, context) => {
  const prompt = `Carefully examine the following sentence, which describes the details of a creative for a social media post in the (Y) industry. Visualize the image the social media creative is trying to convey. Based on this mental image, extract the main themes and keywords that are relevant for optimizing search results for images associated with the post. Consider the context, objects, emotions, and industry-specific keywords. Provide a single short sentence that captures the essence of the social media creative, incorporating relevant keywords without mentioning the company name.

  Sentence: ${data.creative}
  `;

  await openai.createCompletion({
    model: DEFAULT_MODAL,
    prompt: prompt,
    max_tokens: 500,
    temperature: 0,
  });

  const response = await axios.get(
    `https://api.pexels.com/v1/search?query=people&per_page=4`,
    {
      headers: {
        Authorization:
          process.env.PEXELS_API_KEY,
      },
    }
  );

  return response.data;
});
