document.addEventListener('DOMContentLoaded', () => {
    const noteInput = document.getElementById('note-input');
    const addNoteButton = document.getElementById('add-note');
    const notesList = document.getElementById('notes-list');

    // Load existing notes from localStorage
    loadNotes();

    addNoteButton.addEventListener('click', () => {
        const noteText = noteInput.value.trim();
        if (noteText) {
            addNote(noteText);
            noteInput.value = '';
        }
    });

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

    function saveNotes() {
        const notes = [];
        document.querySelectorAll('#notes-list li').forEach(li => {
            notes.push(li.textContent);
        });
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function loadNotes() {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.forEach(note => addNote(note));
    }
});