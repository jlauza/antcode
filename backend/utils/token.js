const jwt = require("jsonwebtoken");
const secret_key = process.env.jwt_token_secret;

const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    fname: user.firstname,
    lname: user.lastname,
    role: user.role,
    username: user.username,
    created_at: user.createdAt,
  };

  const token = jwt.sign(payload, secret_key, {
    expiresIn: "1h",
  });

  return token;
};

module.exports = generateToken;
