// app/firebase.server.ts

import type { App, ServiceAccount } from "firebase-admin/app";
import { initializeApp, getApps, cert, getApp } from "firebase-admin/app";
import type { Auth } from "firebase-admin/auth";
import { getAuth } from "firebase-admin/auth";
import dotenv from 'dotenv';
dotenv.config();

let app: App;
let auth: Auth;

const serviceAccount = {
  "type": "service_account",
  "project_id": "boletin-judicial",
  "private_key_id": process?.env?.REACT_APP_FIREBASE_PRIVATE_ID,
  "private_key": process?.env?.REACT_APP_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  "client_email": "firebase-adminsdk-sh5sx@boletin-judicial.iam.gserviceaccount.com",
  "client_id": "113781952904216990090",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-sh5sx%40boletin-judicial.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
} as ServiceAccount;

if (getApps().length === 0) {
  app = initializeApp({
    credential: cert(serviceAccount),
  });
  auth = getAuth(app);
} else {
  app = getApp();
  auth = getAuth(app);
}

export { auth };