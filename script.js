// Function to sanitize HTML content using DOMPurify
function sanitizeHTML(content) {
  console.log("context", content)
  const dom = DOMPurify.sanitize(content)
  console.log("dom", dom)
  return DOMPurify.sanitize(content);
}

// Function to fetch data from a given URL
async function fetchData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    // Handle the error gracefully
    return null;
  }
}

// Function to display HTML content in a container
function displayHTML(containerId, content) {
  const container = document.getElementById(containerId);
  const div = document.createElement('div');
  div.innerHTML = sanitizeHTML(content);
  container.appendChild(div);
}

// Function to display JSON content in a container
function displayJSON(containerId, data) {
  const container = document.getElementById(containerId);
  const jsonContent = JSON.stringify(data, null, 2);
  const jsonHTML = `<div class="json-container"><pre>${sanitizeHTML(
    jsonContent
  )}</pre></div>`;
  container.appendChild(document.createRange().createContextualFragment(jsonHTML));
}

// Function to fetch and display chat messages
async function fetchAndDisplayChatMessages(chatId, containerId) {
  const messages = await fetchData("data/messages.json");

  if (!messages) {
    console.error('Failed to fetch messages');
    return;
  }

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

  if (!users) {
    console.error('Failed to fetch user details');
    return;
  }

  const userWithMaskedPassword = {
    ...users.find((user) => user.id === userId),
    password: "*********",
  };
  displayJSON(containerId, userWithMaskedPassword);
}

// Function to fetch and display a specific message
async function fetchAndDisplayMessage(messageId, containerId) {
  const messages = await fetchData("data/messages.json");

  if (!messages) {
    console.error('Failed to fetch message details');
    return;
  }

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
