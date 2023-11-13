const textCopyButton = document.getElementById("textCopy");
const closeButton = document.getElementById("close");

const jokeButton = document.getElementById("jokeGenButton");
const jokeContainer = document.querySelector(".joke-container");

jokeButton.addEventListener("click", () => {
  fetch("https://icanhazdadjoke.com/", {
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const joke = data.joke;

      jokeContainer.innerHTML = `<p>${joke}</p>`;
      jokeContainer.style.display = "block";
      textCopyButton.style.display = "block";
      closeButton.style.display = "block";

      textCopyButton.addEventListener("click", () => {
        const jokeText = jokeContainer.querySelector("p");
        const jokeToCopy = jokeText.innerText;

        const textarea = document.createElement("textarea");
        textarea.value = jokeToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        alert("Joke copied to clipboard!");
      });

      closeButton.addEventListener("click", () => {
        jokeContainer.style.display = "none";
        textCopyButton.style.display = "none";
        closeButton.style.display = "none";
      });
    });
});
