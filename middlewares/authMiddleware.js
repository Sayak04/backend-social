import jwt from "jsonwebtoken";

export const isSignedIn = async (req, res, next) => {
  try {
    const decode = jwt.verify(
        req.headers.authorization,
        process.env.JWT_SECRET_KEY,
    );
    req.user = decode;
    next();
  } catch (err) {
    console.log(err);
  }
};
