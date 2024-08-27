const jwt = require("jsonwebtoken");

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

  const token = jwt.sign(payload, "secret-key", {
    expiresIn: "1h",
  });

  return token;
};

module.exports = generateToken;
