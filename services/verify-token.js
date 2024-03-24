import { OAuth2Client } from "google-auth-library";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

async function verifyToken(token) {
  if (!token) return res.sendStatus(401);

  const client = new OAuth2Client();

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: GOOGLE_CLIENT_ID,
  });
  // id_token payload
  const payload = ticket.getPayload();

  return payload;
}

export default verifyToken;
