document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const createTaskLink = document.getElementById("create-task");
  const closeBtn = document.querySelector(".close");
  const form = document.getElementById("task-form");
  const cardList = document.querySelector(".card-list");

  createTaskLink.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Function to create a new task
  function createTask(event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const date = new Date().toLocaleString();

    const newCard = document.createElement("div");
    newCard.classList.add("card", "draft");
    newCard.innerHTML = `
          <div class="card-header">
              <input type="checkbox" class="status-checkbox">
              <button class="remove-btn">Remove</button>
              <button class="edit-btn">Edit</button>
          </div>
          <h2>${title}</h2>
          <p class="date">${date}</p>
          <p class="description">${description}</p>
      `;

    cardList.appendChild(newCard); // Append the new card to the card list
    form.reset();
    modal.style.display = "none";
  }

  // Add event listener for form submission
  form.addEventListener("submit", createTask);

  // Add event listener for remove button
  cardList.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-btn")) {
      const removeConfirmation = confirm(
        "Are you sure you want to remove this task?"
      );
      if (removeConfirmation) {
        event.target.closest(".card").remove();
      }
    }
  });

  // Add event listener for edit button
  cardList.addEventListener("click", (event) => {
    if (event.target.classList.contains("edit-btn")) {
      const card = event.target.closest(".card");
      const title = card.querySelector("h2").innerText;
      const description = card.querySelector(".description").innerText;

      modal.style.display = "flex";
      document.getElementById("title").value = title;
      document.getElementById("description").value = description;

      // Update form submit event listener for editing
      form.removeEventListener("submit", createTask);
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const newTitle = document.getElementById("title").value;
        const newDescription = document.getElementById("description").value;
        const date = new Date().toLocaleString();

        card.querySelector("h2").innerText = newTitle;
        card.querySelector(".description").innerText = newDescription;
        card.querySelector(".date").innerText = date;

        modal.style.display = "none";
        form.reset();
      });
    }
  });
});
