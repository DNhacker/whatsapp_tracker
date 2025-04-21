// App.js: JavaScript for functionality with Local Storage Integration

// Key for localStorage
const LOCAL_STORAGE_KEY = "whatsappOnlineTrackerData";

// Example contact list (default data if no localStorage data is found)
const defaultContacts = [
  { id: 1, name: "John Doe", onlineLogs: [], isOnline: false },
  { id: 2, name: "Jane Smith", onlineLogs: [], isOnline: false },
];

// Function to initialize the app
function initApp() {
  loadContactsFromLocalStorage();
  renderContacts();
}

// Function to load contacts from localStorage
function loadContactsFromLocalStorage() {
  const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);
      contacts.length = 0; // Clear the current array
      contacts.push(...parsedData); // Load the saved data into the contacts array
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
    }
  }
}

// Function to save contacts to localStorage
function saveContactsToLocalStorage() {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  } catch (error) {
    console.error("Error saving data to localStorage:", error);
  }
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
    saveContactsToLocalStorage(); // Save changes to localStorage
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
    saveContactsToLocalStorage(); // Save changes to localStorage
    renderContacts();
  }
}

// Initialize contacts array
const contacts = [...defaultContacts]; // Default data (overwritten by localStorage)

// Initialize the app on page load
window.onload = initApp;
