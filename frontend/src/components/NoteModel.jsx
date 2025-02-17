import React,{useEffect, useState} from 'react'
import './NoteModel.css';
import axios from 'axios';

const NoteModel = ({closeModel, addNote, currentNote, editNote}) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
      if(currentNote){
        setTitle(currentNote.title)
        setDescription(currentNote.description)
      }
    }, [currentNote])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(currentNote){
          editNote(currentNote._id, title, description)
        }
        else{
        addNote(title,description)
        }
      }
  return (
    <div className="modal-overlay">
    <div className="modal-content">
      <h2 className="modal-title">{currentNote ?"Edit Note" : "Add New Note"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note Title"
          className="input-field"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Note Description"
          className="textarea-field"
        />
        <button type="submit" className="submit-button">
         {currentNote ? "Update Note" : "Add Note" }
        </button>
      </form>
      <button className="cancel-button" onClick={closeModel}>
        Cancel
      </button>
    </div>
  </div>
  )
}

export default NoteModel
