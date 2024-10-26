let notes = []; // Array to store notes as objects

document.getElementById('add-note').addEventListener('click', () => {
    const noteTitle = document.getElementById('note-title').value;
    const noteContent = document.getElementById('note-input').value;

    if (noteTitle && noteContent) {
        const note = {
            id: Date.now(), // Unique ID based on timestamp
            title: noteTitle,
            content: noteContent
        };
        notes.push(note); // Add the note to the array
        addNoteToDOM(note); // Display the note in the DOM
        saveNotes(); // Save notes to local storage
        document.getElementById('note-title').value = ''; // Clear title input
        document.getElementById('note-input').value = ''; // Clear content input
    } else {
        alert('Please enter both a title and content for the note.'); // Validation alert
    }
});

function loadNotes() {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    notes = savedNotes; // Load saved notes into the notes array
    notes.forEach(note => addNoteToDOM(note)); // Display each note
}

function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes)); // Save notes to local storage
}

function addNoteToDOM(note) {
    const li = document.createElement('li');
    li.textContent = note.title; // Display only the note title

    // Create a delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = (event) => {
        event.stopPropagation(); // Prevent click event from propagating to the li element
        deleteNote(note.id); // Delete the note
    };

    // Add an event listener to view the content when the title is clicked
    li.onclick = () => {
        alert(`Title: ${note.title}\nContent: ${note.content}`); // Display content in an alert
    };

    li.appendChild(deleteButton); // Add the delete button to the list item
    document.getElementById('notes-list').appendChild(li); // Append the note to the list
}

function deleteNote(noteId) {
    // Filter out the note to delete
    notes = notes.filter(note => note.id !== noteId);
    saveNotes(); // Update local storage
    document.getElementById('notes-list').innerHTML = ''; // Clear the list in the DOM
    loadNotes(); // Refresh the displayed notes
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