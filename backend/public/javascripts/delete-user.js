function deleteUser(event) {
  event.preventDefault();
  const form = document.getElementById("user-delete-form");
  const formData = new FormData(form);

  fetch(form.action, {
    method: "DELETE",
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        const successMessage = document.getElementById("success-message");
        successMessage.textContent = "User deleted successfully!";
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
