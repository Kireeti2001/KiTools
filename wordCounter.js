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
  const lines = text.split(/\r\n|\r|\n/).filter(Boolean);
  const sentences = text.split(/[.!?]/).filter(Boolean);
  const paragraphs = text.split(/\n\s*\n/).filter(Boolean);
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
  const displayString = `
  Text : ${text}
  Character Count: ${charCount}
  Word Count: ${wordCount}
  Line Count : ${lines.length}
  Sentence Count : ${sentences.length}
  Paragraph Count : ${paragraphs.length}
  Average Word Length: ${avgLength.toFixed(numAverageDigits)}
  Longest Word Length: ${maxLength}
  `;

  chrome.notifications.create("wordCounterNotification", {
    type: "basic",
    iconUrl: "logo.png",
    title: "KiTools : Word Counter",
    message: displayString,
  });
  console.log(displayString);
});
