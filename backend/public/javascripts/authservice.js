function loginUser(event) {
  event.preventDefault();
  const form = document.getElementById("login-form");
  const formData = new FormData(form);

  fetch(form.action, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      console.log(response);
      if (response.ok == false) {
        const errorMessage = document.getElementById("error-message");
        errorMessage.textContent = "Invalid creadentials!";
        errorMessage.style.display = "block";
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
