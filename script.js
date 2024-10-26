document.addEventListener('DOMContentLoaded', () => {
    const noteInput = document.getElementById('note-input');
    const addNoteButton = document.getElementById('add-note');
    const notesList = document.getElementById('notes-list');

    // Load existing notes from localStorage
    loadNotes();

    // Add event listener to the button
    addNoteButton.addEventListener('click', () => {
        const noteText = noteInput.value.trim();
        if (noteText) {
            addNote(noteText);
            noteInput.value = '';
        }
    });

    // Function to add a new note
    function addNote(note) {
        const li = document.createElement('li');
        li.textContent = note;

        // Add delete functionality
        li.addEventListener('click', () => {
            li.remove();
            saveNotes();
        });

        notesList.appendChild(li);
        saveNotes();
    }

    // Function to save notes to localStorage
    function saveNotes() {
        const notes = [];
        document.querySelectorAll('#notes-list li').forEach(li => {
            notes.push(li.textContent);
        });
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    // Function to load notes from localStorage
    function loadNotes() {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.forEach(note => addNote(note));
    }

    // Register the service worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('service-worker.js')
                .then((registration) => {
                    console.log('Service Worker registered with scope:', registration.scope);
                })
                .catch((error) => {
                    console.error('Service Worker registration failed:', error);
                });
        });
    }
});