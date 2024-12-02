import React, { useState, useEffect } from 'react';
import { database } from '../Firebase';
import { ref, onValue, update, remove } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingNoteText, setEditingNoteText] = useState('');

  const user = getAuth().currentUser;
  const userId = user?.uid;
  const notesRef = ref(database, `users/${userId}/notes`);

  useEffect(() => {
    if (!userId) return;

    const unsubscribe = onValue(notesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const notesList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setNotes(notesList);
      } else {
        setNotes([]);
      }
    });

    return () => unsubscribe();
  }, [userId]);

  const handleAddNote = () => {
    if (newNote) {
      const newNoteItem = {
        text: newNote,
        timestamp: Date.now(),
      };

      update(notesRef, {
        [Date.now()]: newNoteItem,
      })
        .then(() => {
          setNewNote('');
        })
        .catch((error) => {
          console.error('Error adding note:', error);
        });
    }
  };

  const handleDeleteNote = (id) => {
    const noteItemRef = ref(database, `users/${userId}/notes/${id}`);
    remove(noteItemRef).catch((error) => console.error('Error deleting note:', error));
  };

  const handleEditNote = (id, text) => {
    setEditingNoteId(id);
    setEditingNoteText(text);
  };

  const handleSaveEditedNote = () => {
    if (editingNoteText) {
      const noteItemRef = ref(database, `users/${userId}/notes/${editingNoteId}`);
      update(noteItemRef, {
        text: editingNoteText,
      })
        .then(() => {
          setEditingNoteId(null);
          setEditingNoteText('');
        })
        .catch((error) => {
          console.error('Error updating note:', error);
        });
    }
  };

  return (
    <div className="w-full h-full bg-white/10 p-4 rounded-lg shadow-md grid grid-rows-[auto,1fr]">
      {/* Group title and input */}
      <div>
        <p className="text-white text-base font-semibold text-center">Add Notes</p>
        <div className="flex items-center mt-2">
          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a new note"
            className="w-full p-2 border border-gray-300 rounded-l-lg focus:outline-none bg-white/10 text-white"
          />
          <button
            onClick={handleAddNote}
            className="w-32 p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>

      <div className="overflow-y-auto max-h-[calc(100vh-250px)] mt-4">
        {notes.length > 0 ? (
          <ul>
            {notes.map((note) => (
              <li
                key={note.id}
                className="flex items-center justify-between p-2 mb-2 rounded-md"
              >
                <div className="flex items-center space-x-2">
                  {editingNoteId === note.id ? (
                    <>
                      <input
                        type="text"
                        value={editingNoteText}
                        onChange={(e) => setEditingNoteText(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md bg-white/10 text-white"
                      />
                      <button
                        onClick={handleSaveEditedNote}
                        className="text-green-500 hover:text-green-700"
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="flex-1 text-white">{note.text}</span>
                      <button
                        onClick={() => handleEditNote(note.id, note.text)}
                        className="text-gray-200 hover:text-gray-500"
                      >
                        <FaEdit />
                      </button>
                    </>
                  )}
                </div>
                <button
                  onClick={() => handleDeleteNote(note.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrashAlt />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-300 text-center">No notes added</p>
        )}
      </div>
    </div>
  );
};

export default Notes;
