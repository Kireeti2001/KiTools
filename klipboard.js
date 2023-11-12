const keyInput = document.getElementById("keyInput");
const valueInput = document.getElementById("valueInput");
const saveButton = document.getElementById("saveButton");
const klipbordButton = document.getElementById("klipbordButton");
const klipbordContainer = document.querySelector(".klipboard-container");

klipbordButton.addEventListener("click", () => {
  klipbordContainer.style.display = "block";
});
saveButton.addEventListener("click", () => {
  const key = keyInput.value;
  const value = valueInput.value;
  chrome.runtime.sendMessage({ action: "saveKeyValue", key, value });
  getKeyValues((keyValuePairs) => {
    applyReplacements(keyValuePairs);
  });
});

// Function to retrieve key-value pairs from storage
function getKeyValues(callback) {
  chrome.storage.local.get("keyValuePairs", (result) => {
    const keyValuePairs = result.keyValuePairs || {};
    callback(keyValuePairs);
  });
}

// Function to apply replacements in the page content
function applyReplacements(keyValuePairs) {
  const textNodes = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  let node;
  while ((node = textNodes.nextNode())) {
    for (const key in keyValuePairs) {
      if (keyValuePairs.hasOwnProperty(key)) {
        const value = keyValuePairs[key];
        const regex = new RegExp(`!{${key}}`, "g");
        node.nodeValue = node.nodeValue.replace(regex, value);
      }
    }
  }
}

chrome.runtime.onInstalled.addListener(() => {
  // Initialize storage with an empty object if it doesn't exist yet.
  chrome.storage.local.get("keyValuePairs", (result) => {
    if (!result.keyValuePairs) {
      chrome.storage.local.set({ keyValuePairs: {} });
    }
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "saveKeyValue") {
    chrome.storage.local.get("keyValuePairs", (result) => {
      const keyValuePairs = result.keyValuePairs;
      keyValuePairs[message.key] = message.value;
      chrome.storage.local.set({ keyValuePairs });
    });
  }
});
