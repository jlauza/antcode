function loginUser(event) {
  event.preventDefault();
  const form = document.getElementById("login-form");
  const formData = new FormData(form);

  fetch(form.action, {
    method: "POST",
    body: formData,
  })
    .then(async (response) => {
      const data = await response.json();

      if (response.ok) {
        window.location.href = "/dashboard";
      }

      if (!response.ok) {
        const errorMessage = document.getElementById("error-message");

        if (response.status) {
          errorMessage.textContent = data.error;
        }

        errorMessage.style.display = "block";
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