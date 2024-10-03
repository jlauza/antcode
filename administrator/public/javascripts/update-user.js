function updateUser(event) {
  event.preventDefault();
  const form = document.getElementById("user-update-form");
  const formData = new FormData(form);

  fetch(form.action, {
    method: "PUT",
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        const successMessage = document.getElementById("success-message");
        successMessage.textContent = "User updated successfully!";
        successMessage.style.display = "block";
      } else {
        // Show an error message
        const errorMessage = document.getElementById("error-message");
        errorMessage.textContent =
          "An error occurred. Please see the console for more details.";
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
