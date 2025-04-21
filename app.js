// App.js: JavaScript for functionality

// Example contact list
const contacts = [
  { id: 1, name: "John Doe", onlineLogs: [], isOnline: false },
  { id: 2, name: "Jane Smith", onlineLogs: [], isOnline: false },
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

    // Status Dot
    const statusDot = document.createElement("span");
    statusDot.className = `status-dot ${
      contact.isOnline ? "status-online" : "status-offline"
    }`;

    // Contact Name
    const contactName = document.createElement("span");
    contactName.textContent = contact.name;

    // Actions (Online/Offline buttons)
    const actionsDiv = document.createElement("div");
    actionsDiv.className = "contact-actions";

    const onlineButton = document.createElement("button");
    onlineButton.textContent = "Online";
    onlineButton.className = "online";
    onlineButton.onclick = () => setContactOnline(contact.id);

    const offlineButton = document.createElement("button");
    offlineButton.textContent = "Offline";
    offlineButton.className = "offline";
    offlineButton.onclick = () => setContactOffline(contact.id);

    actionsDiv.appendChild(onlineButton);
    actionsDiv.appendChild(offlineButton);

    // Append elements to the list item
    li.appendChild(statusDot);
    li.appendChild(contactName);
    li.appendChild(actionsDiv);

    // Add the list item to the contact list
    contactList.appendChild(li);
  });
}

// Function to set a contact as online
function setContactOnline(contactId) {
  const contact = contacts.find((c) => c.id === contactId);
  if (contact && !contact.isOnline) {
    contact.isOnline = true;
    contact.onlineLogs.push({ start: new Date().toISOString() });
    renderContacts();
  }
}

// Function to set a contact as offline
function setContactOffline(contactId) {
  const contact = contacts.find((c) => c.id === contactId);
  if (contact && contact.isOnline) {
    contact.isOnline = false;
    const lastLog = contact.onlineLogs[contact.onlineLogs.length - 1];
    if (lastLog) lastLog.end = new Date().toISOString();
    renderContacts();
  }
}

// Initialize the app on page load
window.onload = initApp;
