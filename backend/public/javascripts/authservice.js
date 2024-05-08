const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const apiUrl = process.env.REACT_APP_API_LOGIN;

console.log(apiUrl);

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form#login-form");

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const emailInput = form.querySelector('input[name="email"]');
      const passwordInput = form.querySelector('input[name="password"]');
      const email = emailInput ? emailInput.value : "";
      const password = passwordInput ? passwordInput.value : "";
      const api = apiUrl; // make sure to define your API URL

      try {
        const res = await axios.post(api, { email, password });
        console.log(res);
        window.location.href = "/dashboard";
      } catch (err) {
        console.error(err);
        // Optionally handle the error in the UI, such as displaying a message to the user.
      }
    });
  } else {
    console.error("Form #login-form not found on this page.");
  }
});
