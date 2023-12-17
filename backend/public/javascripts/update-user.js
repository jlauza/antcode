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
        // Update the UI
        console.log("Body: ", response.body);

        // Hide the loading indicator
        loadingIndicator.style.display = "none";
      } else {
        // Show an error message
        const errorMessage = document.getElementById("error-message");
        errorMessage.textContent =
          "An error occurred. Please see the console for more details.";
      }
    })
    .catch((error) => {
      console.error(error);
      // Show an error message
      const errorMessage = document.getElementById("error-message");
      errorMessage.textContent = "An unknown error occurred.";
      errorMessage.style.display = "block";
      // Hide the loading indicator
      loadingIndicator.style.display = "none";
    });
}
