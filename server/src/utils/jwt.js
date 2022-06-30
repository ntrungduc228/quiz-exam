const jwt = require("jsonwebtoken");

const tokenLife = process.env.TOKEN_LIFE;
const secret = process.env.TOKEN_SECRET;

let generateToken = (data) => {
  console.log("token life", tokenLife);
  return new Promise((resolve, reject) => {
    try {
      let token = jwt.sign(data, secret, { expiresIn: tokenLife });

      resolve(token);
    } catch (err) {
      reject(err);
    }
  });
};

let verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, secret, function (err, decoded) {
        if (err) {
          console.log("err verify token:", err.message);
          return resolve({
            success: false,
            message: err.message,
            errorName: err.name,
            errToken: true,
          });
        }
        resolve({ decoded, success: true });
      });
    } catch (err) {
      console.log("error", err);
      reject(err);
    }
  });
};

module.exports = { generateToken, verifyToken };
