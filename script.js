document.getElementById('save-note').addEventListener('click', () => {
    const noteInput = document.getElementById('note-input');
    const noteText = noteInput.value;
    if (noteText) {
        addNoteToDOM(noteText);
        saveNotes();
        noteInput.value = ''; // Clear input after saving
    }
});

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    console.log('Loaded notes:', notes); // Log the loaded notes
    notes.forEach(note => addNoteToDOM(note));
}

function saveNotes() {
    const notes = [];
    document.querySelectorAll('#notes-list li').forEach(li => {
        notes.push(li.textContent);
    });
    localStorage.setItem('notes', JSON.stringify(notes));
    console.log('Notes saved:', notes); // Log the saved notes
}

function addNoteToDOM(note) {
    const li = document.createElement('li');
    li.textContent = note;
    document.getElementById('notes-list').appendChild(li);
}

// Load notes when the app starts
loadNotes();

// Register the service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
    }).catch(error => {
        console.log('Service Worker registration failed:', error);
    });
}