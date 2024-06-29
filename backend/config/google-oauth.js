import { google } from "googleapis";
import config from "./config";

const OAuth2 = google.auth.OAuth2;

export const oauth2Client = new OAuth2(
  config.googleClientId,
  config.googleClientSecret,
  config.googleRedirectUrl
);

