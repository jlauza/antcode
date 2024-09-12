function loginUser(event) {
  event.preventDefault();
  const form = document.getElementById("login-form");
  const formData = new FormData(form);

  console.log(formData);

  fetch(form.action, {
    method: "POST",
    body: formData,
  })
    .then(async (response) => {
      const data = await response.json();

      if (!response.ok) {
        const errorMessage = document.getElementById("error-message");

        if (response.status === 401) {
          errorMessage.textContent = "Invalid credentials!";
        } else if (response.status === 404) {
          errorMessage.textContent = "User not found!";
        } else if (response.status === 500) {
          errorMessage.textContent = "Internal server error!";
        }
        errorMessage.style.display = "block";
      } else {
        window.location.href = "/dashboard";
      }
    })
    .catch((error) => {
      console.error(error);
      const errorMessage = document.getElementById("error-message");
      errorMessage.textContent =
        "An error occurred while processing your request.";
      errorMessage.style.display = "block";
    });
}
