document.getElementById("prettyJsonButton").addEventListener("click", () => {
  const jsonParserHtml = ` <h1>JSON Parser</h1>
  <textarea id="jsonInput" placeholder="Enter JSON data here"></textarea>
  <button id="parseButton">Parse JSON</button>
  <pre id="jsonOutput"></pre>
  <script src="jsonParser.js"></script>`;
  const popupWindow = window.open(
    "jsonParser.html",
    "JSON Parser Popup",
    "width=400,height=300"
  );
  popupWindow.document.open();
  popupWindow.document.write(jsonParserHtml);
  popupWindow.document.close();
});

document.addEventListener("DOMContentLoaded", function () {
  const jsonInput = document.getElementById("jsonInput");
  const parseButton = document.getElementById("parseButton");
  const jsonOutput = document.getElementById("jsonOutput");

  parseButton.addEventListener("click", function () {
    try {
      const inputData = jsonInput.value;
      const parsedData = JSON.parse(inputData);
      jsonOutput.textContent = JSON.stringify(parsedData, null, 2);
    } catch (error) {
      jsonOutput.textContent = "Error parsing JSON: " + error.message;
    }
  });
});
