// App.js: JavaScript for functionality

// Example contact list
const contacts = [
  { id: 1, name: "John Doe", onlineLogs: [] },
  { id: 2, name: "Jane Smith", onlineLogs: [] },
];

// Function to initialize the app
function initApp() {
  renderContacts();
}

// Function to render contacts
function renderContacts() {
  const contactList = document.getElementById("contact-list");
  contactList.innerHTML = ""; // Clear existing content

  contacts.forEach((contact) => {
    const li = document.createElement("li");
    li.textContent = contact.name;
    contactList.appendChild(li);
  });
}

// Initialize the app on page load
window.onload = initApp;
