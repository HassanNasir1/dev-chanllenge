async function fetchData(url) {
    const response = await fetch(url);
    return await response.json();
  }
  
  function displayHTML(containerId, content) {
    const container = document.getElementById(containerId);
    container.innerHTML = content;
  }
  
  function displayJSON(containerId, data) {
    const container = document.getElementById(containerId);
    const jsonContent = JSON.stringify(data, null, 2);
    const jsonHTML = `<div class="json-container"><pre>${jsonContent}</pre></div>`;
    container.innerHTML = jsonHTML;
  }
  
  async function fetchAndDisplayChatMessages(chatId, containerId) {
    const messages = await fetchData("../data/messages.json");
    const filteredMessages = messages.filter((message) => message.chatid === chatId);
    const htmlContent = filteredMessages.map((message) => `<div class="message">${message.message}</div>`).join("");
    displayHTML(containerId, htmlContent);
  }
  
  async function fetchAndDisplayUserDetails(userId, containerId) {
    const users = await fetchData("../data/users.json");
    const userWithMaskedPassword = { ...users.find((user) => user.id === userId), password: "*********" };
    displayJSON(containerId, userWithMaskedPassword);
  }
  
  async function fetchAndDisplayMessage(messageId, containerId) {
    const messages = await fetchData("../data/messages.json");
    const message = messages.find((msg) => msg.id === messageId);
    const htmlContent = `<div class="message">${message.message}</div>`;
    displayHTML(containerId, htmlContent);
  }
  
  // Fetch and display data when the page loads
  fetchAndDisplayChatMessages(3, "chat3-messages");
  fetchAndDisplayChatMessages(8, "chat8-messages");
  fetchAndDisplayUserDetails(100, "user100-data");
  fetchAndDisplayMessage(459, "message459-content");
  