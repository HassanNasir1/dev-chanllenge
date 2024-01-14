// Function to sanitize HTML content using DOMPurify
function sanitizeHTML(content) {
  return DOMPurify.sanitize(content);
}

// Function to fetch data from a given URL
async function fetchData(url) {
  const response = await fetch(url);
  return await response.json();
}

// Function to display HTML content in a container
function displayHTML(containerId, content) {
  const container = document.getElementById(containerId);
  container.innerHTML = sanitizeHTML(content);
}

// Function to display JSON content in a container
function displayJSON(containerId, data) {
  const container = document.getElementById(containerId);
  const jsonContent = JSON.stringify(data, null, 2);
  const jsonHTML = `<div class="json-container"><pre>${sanitizeHTML(
    jsonContent
  )}</pre></div>`;
  container.innerHTML = jsonHTML;
}

// Function to fetch and display chat messages
async function fetchAndDisplayChatMessages(chatId, containerId) {
  const messages = await fetchData("data/messages.json");
  const filteredMessages = messages.filter(
    (message) => message.chatid === chatId
  );
  const htmlContent = filteredMessages
    .map(
      (message) => `<div class="message">${sanitizeHTML(message.message)}</div>`
    )
    .join("");
  displayHTML(containerId, htmlContent);
}

// Function to fetch and display user details
async function fetchAndDisplayUserDetails(userId, containerId) {
  const users = await fetchData("data/users.json");
  const userWithMaskedPassword = {
    ...users.find((user) => user.id === userId),
    password: "*********",
  };
  displayJSON(containerId, userWithMaskedPassword);
}

// Function to fetch and display a specific message
async function fetchAndDisplayMessage(messageId, containerId) {
  const messages = await fetchData("data/messages.json");
  const message = messages.find((msg) => msg.id === messageId);
  const htmlContent = `<div class="message">${sanitizeHTML(
    message.message
  )}</div>`;
  displayHTML(containerId, htmlContent);
}

// Fetch and display data when the page loads
fetchAndDisplayChatMessages(3, "chat3-messages");
fetchAndDisplayChatMessages(8, "chat8-messages");
fetchAndDisplayUserDetails(100, "user100-data");
fetchAndDisplayMessage(459, "message459-content");
