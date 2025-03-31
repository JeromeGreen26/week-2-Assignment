// Base API URL
const apiUrl = "http://localhost:5000/items";

// Get elements
const itemNameInput = document.getElementById("item-name");
const itemsList = document.getElementById("items-list");
const createItemForm = document.getElementById("create-item-form");

// Fetch and display all items from the API
async function fetchItems() {
  const response = await fetch(apiUrl);
  const items = await response.json();
  itemsList.innerHTML = "";
  items.forEach(item => {
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item", "d-flex", "justify-content-between");
    listItem.textContent = item.name;
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-danger", "btn-sm");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteItem(item.id);
    listItem.appendChild(deleteButton);
    itemsList.appendChild(listItem);
  });
}

// Add a new item to the API
async function addItem(name) {
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  const newItem = await response.json();
  fetchItems(); // Refresh the list
}

// Delete an item from the API
const deleteItem = async (id) => {
    const response = await fetch(`http://localhost:5000/items/${id}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        console.log('Item deleted');
    } else {
        console.log('Error deleting item');
    }
};


// Handle form submission to create a new item
createItemForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const itemName = itemNameInput.value;
  if (itemName) {
    addItem(itemName);
    itemNameInput.value = ""; // Clear input field
  }
});

// Initial fetch to display items
fetchItems();
