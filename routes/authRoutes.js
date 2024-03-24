import { OAuth2Client } from "google-auth-library";
import express from "express";

const PORT = process.env.PORT || 5000;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = `http://localhost:${PORT}${process.env.REDIRECT_URI}`;
const router = express.Router();

const oAuth2Client = new OAuth2Client(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  REDIRECT_URI
);

router.get("/google/callback", async (req, res) => {
  try {
    const { code } = req.query;

    const _tokens = await oAuth2Client.getToken(code);
    // Set the credentials on the OAuth2 client.
    oAuth2Client.setCredentials(_tokens.tokens);

    const userData = await oAuth2Client.request({
      url: "https://www.googleapis.com/oauth2/v3/userinfo",
    });

    // Check for google_id (sub) in DB, if not exists insert the user data to DB

    // Send cookie to the client-side containing id_token
    res
      .status(200)
      .cookie("id_token", oAuth2Client.credentials.id_token, {
        maxAge: process.env.COOKIE_EXPIRY,
        //   secure: true, // the cookie is only sent over HTTPS
      })
      .json({ data: userData.data });
  } catch (err) {
    res.status(401).json({ error: "Authentication Failed" });
  }
});

router.get("/google/login", (req, res) => {
  // Generate the url that will be used for the Google consent dialog.
  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  });

  res.status(200).json({ url: authorizeUrl });
});

router.get("/logout", async (req, res) => {
  // Delete cookies stored on client-side
  /* clearCookie does not send response and not close connection. 
  We must send back response, or the cookie won't be deleted. */
  res.status(204).clearCookie("id_token").end();
});

export default router;
