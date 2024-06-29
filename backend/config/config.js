import "dotenv/config";

export default {
  port: process.env.PORT || 3333,
  googleClientId: process.env.GOOGLE_CLIENT_ID || "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  googleRedirectUrl: process.env.GOOGLE_REDIRECT_URI || "",
  databaseUrl: process.env.DATABASE_URL || "",
  successRedirectUrl: process.env.SUCCESS_REDIRECT_URL || "",
};
