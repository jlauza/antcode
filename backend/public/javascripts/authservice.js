const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const api = process.env.REACT_APP_API_LOGIN;

console.log(api);

document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();
  const email = document.querySelector('input[name="email"]').value;
  const password = document.querySelector('input[name="password"]').value;

  await axios
    .post(api, { email, password })
    .then((res) => {
      console.log(res);
      window.location = "/users/profile";
    })
    .catch((err) => {
      console.error(err);
    });
});
