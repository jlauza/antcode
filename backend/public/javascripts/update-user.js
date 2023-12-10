function updateUser(event) {
  event.preventDefault();
  const form = document.getElementById("user-update-form");
  const formData = new FormData(form);
  fetch(form.action, {
    method: "PUT",
    body: formData,
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}
