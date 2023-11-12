chrome.contextMenus.create({
  id: "wordCounter",
  title: "wordCounter",
  contexts: ["all"],
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  console.log("Context menu clicked");
  const text = info.selectionText;
  console.log(info);
  console.log(tab);
  const words = text.split(/\s+/);
  const wordCount = words.length;
  const charCount = text.length;

  let totalLength = 0;
  let maxLength = 0;
  for (let i = 0; i < wordCount; i++) {
    const curLength = words[i].replace(
      /[.,?!()<>{}[\]/\\+=~'`|:;]/g,
      ""
    ).length;
    totalLength += curLength;
    if (curLength > maxLength) {
      maxLength = curLength;
    }
  }
  const avgLength = wordCount === 0 ? 0 : totalLength / wordCount;

  const numAverageDigits = 2;
  const displayString = `Word Count: ${wordCount}
  Character Count: ${charCount}
  Average Word Length: ${avgLength.toFixed(numAverageDigits)}
  Longest Word Length: ${maxLength}`;
  const notificationOptions = {
    type: "basic",
    title: "notification title",
    message: displayString,
    priority: 2,
  };
  chrome.notifications.create("Notification", {
    type: "basic",
    title: "notification title",
    message: displayString,
  });
  chrome.contextMenus.send;
  console.log(displayString);
});
