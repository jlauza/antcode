async function registerUser(event) {
  event.preventDefault();
  const form = document.getElementById("register-form");
  const formData = new FormData(form);

  const errorMessage = document.getElementById("error-message");
  const successMessage = document.getElementById("success-message");

  errorMessage.style.display = "none";
  successMessage.style.display = "none";

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      successMessage.textContent = data.message;
      successMessage.style.display = "block";

      window.location.href = "/dashboard";
    } else {
      displayErrors(data.errors);
    }
  } catch (error) {
    console.error(error);
    errorMessage.textContent =
      "An error occurred while processing your request.";
    errorMessage.style.display = "block";
  }
}

function displayErrors(errors) {
  const errorMessage = document.getElementById("error-message");
  errorMessage.innerHTML = "";
  errorMessage.style.display = "block";

  if (Array.isArray(errors)) {
    const errorList = document.createElement("ul");
    errorList.style.listStyleType = "none";

    errors.forEach((error) => {
      const listItem = document.createElement("li");

      const icon = document.createElement("span");
      icon.classList.add("bi", "bi-x", "text-danger");

      const errorText = document.createTextNode(`${error}`);
      listItem.appendChild(icon);
      listItem.appendChild(errorText);
      errorList.appendChild(listItem);
    });
    errorMessage.appendChild(errorList);
  } else {
    const listItem = document.createElement("li");
    const icon = document.createElement("span");
    icon.classList.add("bi", "bi-x", "text-danger"); // Icon for single error
    const errorText = document.createTextNode(` ${errors}`);
    listItem.appendChild(icon);
    listItem.appendChild(errorText);
    errorMessage.appendChild(listItem);
  }
}
