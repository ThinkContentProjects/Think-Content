import { readFileSync } from "fs";
import * as firebase from "@firebase/testing";
const PROJECT_ID = "think-content-development";

describe("APP", () => {
  it("Can read items from read-only collection", async () => {
    const db = firebase.initializeTestApp({projectId: PROJECT_ID}).firestore();
    const testDoc = db.collection("workspaces").doc("testDoc");
    await firebase.assertSucceeds(testDoc.get());
  });
});