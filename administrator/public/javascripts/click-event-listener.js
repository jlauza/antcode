document.addEventListener("DOMContentLoaded", () => {
  // General function to handle click events and fetch components
  const handleComponentLoad = (buttonSelector, url, targetSelector) => {
    const button = document.querySelector(buttonSelector);

    if (button) {
      button.addEventListener("click", () => {
        fetch(url)
          .then((response) => response.text())
          .then((html) => {
            // Insert the component into the specified target container
            const target = document.querySelector(targetSelector);
            if (target) {
              target.innerHTML = html;
            }
          })
          .catch((error) => {
            console.error(`Error fetching component from ${url}:`, error);
          });
      });
    }
  };

  // Example: Set up multiple component loads
  handleComponentLoad(
    "#show-edit-mode",
    "/users/profile/edit/#{id}",
    "#show-edit-mode"
  );
  handleComponentLoad(
    "#another-btn",
    "/another-component",
    "#another-container"
  );
});
