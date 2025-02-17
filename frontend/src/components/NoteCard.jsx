import React from 'react'
import './NoteCard.css';
import {FaEdit,FaTrash} from 'react-icons/fa'

const NoteCard = ({note, onEdit, deleteNote}) => {
  return (
        <div className="notecard-main">
          <h2>{note.title}</h2>
          <p>{note.description}</p>
          <div className="actions-notecard">
            <button className="edit-btn-notecard" onClick={() => onEdit(note)}>
              <FaEdit />
            </button>
            <button className="delete-btn-notecard"
            onClick={() => deleteNote(note._id)}>
              <FaTrash />
            </button>
          </div>
        </div>
  )
}

export default NoteCard
