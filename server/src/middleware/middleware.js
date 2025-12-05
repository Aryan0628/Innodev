// auth0Middleware.js
import { auth } from "express-oauth2-jwt-bearer";

export const checkJwt = auth({
  audience: "https://Codomon.com/api",     // from Auth0 API settings
  issuerBaseURL: "https://dev-eqdjur8rssmalaln.us.auth0.com/", // your Auth0 domain
});
console.log("Auth0 Middleware configured with audience =>", "https://Codomon.com/api");