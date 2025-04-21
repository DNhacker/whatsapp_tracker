// App.js: JavaScript for functionality with Analytics

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
  renderAnalytics(); // Initialize analytics display
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
    contactName.onclick = () => showAnalyticsForContact(contact.id); // Show analytics on click

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

// Function to render analytics
function renderAnalytics() {
  const analyticsData = document.getElementById("analytics-data");
  analyticsData.innerHTML = "<p>Select a contact to view analytics.</p>";
}

// Function to show analytics for a specific contact
function showAnalyticsForContact(contactId) {
  const contact = contacts.find((c) => c.id === contactId);
  if (!contact) return;

  const analyticsData = document.getElementById("analytics-data");
  analyticsData.innerHTML = ""; // Clear previous analytics

  // Calculate total online time
  const totalOnlineTime = calculateTotalOnlineTime(contact.onlineLogs);

  // Create analytics display
  const analyticsHeader = document.createElement("h3");
  analyticsHeader.textContent = `Analytics for ${contact.name}`;

  const totalOnlineTimeDisplay = document.createElement("p");
  totalOnlineTimeDisplay.textContent = `Total Online Time: ${formatTime(totalOnlineTime)}`;

  // Append to analytics section
  analyticsData.appendChild(analyticsHeader);
  analyticsData.appendChild(totalOnlineTimeDisplay);
}

// Function to calculate total online time
function calculateTotalOnlineTime(onlineLogs) {
  return onlineLogs.reduce((total, log) => {
    const startTime = new Date(log.start).getTime();
    const endTime = log.end ? new Date(log.end).getTime() : Date.now();
    return total + (endTime - startTime);
  }, 0);
}

// Function to format time (milliseconds to HH:MM:SS)
function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

// Initialize contacts array
const contacts = [...defaultContacts]; // Default data (overwritten by localStorage)

// Initialize the app on page load
window.onload = initApp;
