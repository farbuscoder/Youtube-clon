import jwt from "jsonwebtoken";
import { createError } from "./error.js";
import { access } from "./controllers/auth.js";

export const verifyToken = (req, res, next) => {
  const token = access.token;
  //console.log(req);
  console.log(req.cookies.access_token);
  console.log(req.cookies);

  console.log("token de acceso: " + access.token);

  console.log("Este es el token desde verify token: " + token);

  try {
    if (!access.token) {
      return next(createError(401, "You are not authenticated"));
    }
    jwt.verify(access.token, process.env.JWT, (err, user) => {
      if (err) {
        return next(createError(403, "Token is not valid"));
      }
      req.user = user;
      next();
    });
  } catch (error) {
    console.log(error);
  }
};
