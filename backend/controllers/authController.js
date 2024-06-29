import { google } from "googleapis";
import config from "../config/config.js";
import findOrCreateUseCase from "../application/use_cases/auth/findOrCreateUseCase.js";
import findById from "../application/use_cases/auth/findById.js";
import { oauth2Client } from "../config/google-oauth.js";

export default function authController(userRepository) {
  const initializeGoogleAuth = async (req, res) => {
    const scopes = [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/gmail.readonly",
    ];

    const url = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: scopes,
      prompt: "consent",
    });

    res.json({
      url: url,
    });
  };

  const googleAuthCallback = async (req, res) => {
    // Handling the case when user denies access to their Google account
    if (req.query.error || !req.query.code) {
      return res.redirect(config.successRedirectUrl);
    }

    // check if the user is already has a session
    if (req.session.user) {
      return res.redirect(config.successRedirectUrl);
    }

    // Generate tokens
    const { tokens } = await oauth2Client.getToken(req.query.code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: "v2",
    });

    // Get user information from Google and save it in the database

    oauth2.userinfo.get(async (err, response) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          data: null,
          message: "Error retrieving user information",
        });
      }

      const { id, email, name, picture } = response.data;

      console.log("access_token: ", tokens.access_token);

      // Save or update user in database
      const userInput = {
        googleId: id,
        email,
        name,
        picture,
        refreshToken: tokens.refresh_token,
      };

      const user = await findOrCreateUseCase({
        userRepository,
        data: userInput,
      });

      // Set session cookie
      req.session.user = {
        id: user.id,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      };

      res.redirect(config.successRedirectUrl);
    });
  };

  const getUser = async (req, res) => {
    console.log("req.session.user: ", req.session);
    const userId = req.session.user.id;
    const user = await findById({ userRepository, id: userId });

    res.json({
      success: true,
      data: user,
      message: "User retrieved successfully",
    });
  };

  const logout = async (req, res) => {
    req.session = null;
    res.json({
      success: true,
      data: null,
      message: "User logged out successfully",
    });
  };

  return {
    initializeGoogleAuth,
    googleAuthCallback,
    getUser,
    logout,
  };
}
