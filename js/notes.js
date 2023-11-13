// Save a new note
document.getElementById("saveNote").addEventListener("click", function () {
  const noteText = document.getElementById("noteText").value;
  if (noteText) {
    saveNote(noteText);
    document.getElementById("noteText").value = "";
  }
});

// Function to save a new note
function saveNote(noteText) {
  chrome.storage.sync.get({ notes: [] }, function (result) {
    const notes = result.notes;
    notes.push(noteText);
    chrome.storage.sync.set({ notes: notes }, function () {
      loadNotes();
    });
  });
}

// Function to load and display notes
function loadNotes() {
  const noteList = document.getElementById("noteList");
  noteList.innerHTML = "";

  chrome.storage.sync.get({ notes: [] }, function (result) {
    const notes = result.notes;

    for (let i = 0; i < notes.length; i++) {
      const note = notes[i];
      const noteElement = document.createElement("div");
      noteElement.textContent = note;
      noteList.appendChild(noteElement);
    }
  });
}
