"use client";

import React, { useState, useEffect } from 'react';
import { openDB } from 'idb';
import { FloatingNav } from '@/components/ui/FloatingNav';

interface Note {
  id?: number;
  title: string;
  content: string;
  date: string;
}

const NotesPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const initDB = async () => {
      await openDB('notesDB', 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains('notes')) {
            db.createObjectStore('notes', { keyPath: 'id', autoIncrement: true });
          }
        },
      });
    };
    initDB();
  }, []);


  const saveNote = async () => {
    if (!title || !content) return alert('Both fields are required!');
    
    const db = await openDB('notesDB', 1);
    await db.add('notes', { title, content, date: new Date().toISOString() });
    setTitle('');
    setContent('');
    loadNotes(); // Refresh the list after adding
  };


  const loadNotes = async () => {
    const db = await openDB('notesDB', 1);
    const allNotes = (await db.getAll('notes')) as Note[]; // Cast the result as Note[]
    setNotes(allNotes);
  };
  

  return (
    <div className="p-4 bg-black-100 max-w-lg mx-auto">
        <div>
            <FloatingNav  navItems={[]}/>
        </div>
      <h1 className="text-2xl lg:text-xl md:text-L sm:text-md font-sans mb-5">Notes</h1>
      
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />
      
      <textarea
        placeholder="Write your note here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-2 h-32"
      />

      <button onClick={saveNote} className="bg-slate-600 text-[#C1C2D3] px-4 py-2 rounded mr-2">
        Save Note
      </button>
      <button onClick={loadNotes} className="bg-gray-800 text-[#C1C2D3] px-4 py-2 rounded">
        Show Notes
      </button>

      <div className="mt-4">
        {notes.map((note) => (
          <div key={note.id} className="p-3 border border-white/[0.1] rounded mt-2">
            <h2 className="font-semibold">{note.title}</h2>
            <p>{note.content}</p>
            <small className="text-gray-500">{new Date(note.date).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesPage;
