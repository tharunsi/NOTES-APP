import React,{useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import './Home.css';
import NoteModel from '../components/NoteModel';
import axios from 'axios';
import NoteCard from '../components/NoteCard';
import {toast} from 'react-toastify'

const Home = () => {
  const [isModelOpen, setModelOpen] = useState(false)
  const [notes,setNotes] = useState([])
  const [currentNote,setCurrentNote] = useState(null)
  const [filteredNotes,setFilteredNotes] = useState(false)
  const [query,setQuery] = useState('')

  useEffect(() => {
  
    fetchNotes()
  }, [])

  useEffect(() => {
  
    setFilteredNotes(
      notes.filter((note) => 
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.description.toLowerCase().includes(query.toLowerCase()))
    )
  }, [query,notes])

  const API = import.meta.env.VITE_API_BASE_URL;


  const fetchNotes = async () => {
    try{
     const {data} = await axios.get(`${API}/api/note`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
     })
     setNotes(data.notes)
    } catch(error){
       console.log(error)
    }
 }

  const closeModel = () => {
    setModelOpen(false)
  }

  const onEdit = (note) => {
    setCurrentNote(note)
    setModelOpen(true)
  }

  const addNote = async (title,description) => {
    try{
      const response = await axios.post(`${API}/api/note/add`,{title,description}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      console.log(response)
      if(response.data.success){
        fetchNotes()
        closeModel()
      }
  }
  catch(error){
      console.log(error)
  }
  }

  const editNote = async (id, title, description) => {
    try{
      const response = await axios.put(`${API}/api/note/${id}`,{title,description}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      console.log(response)
      if(response.data.success){
        fetchNotes()
        closeModel()
      }
  }
  catch(error){
      console.log(error)
  }
  } 

  const deleteNote = async (id) => {
    try{
      const response = await axios.delete(`${API}/api/note/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      })
      
      if(response.data.success){
        toast.success("note deleted")
        fetchNotes()
      }
  }
  catch(error){
      console.log(error)
  }
  }


  return (
    <div className='home-main-body'> 
      <Navbar setQuery={setQuery}/>

      <div className='notes-container-home'>
        {filteredNotes.length > 0 ? filteredNotes.map((note) => (
             <NoteCard note={note}
             onEdit={onEdit}
             deleteNote={deleteNote}
              />
        )) : <p>No Notes</p>}
      </div>

      <button onClick={() => setModelOpen(true)}
      className='add-note-button'> + </button>

    {isModelOpen && <NoteModel closeModel={closeModel} addNote={addNote}
    currentNote={currentNote}
    editNote={editNote} />}
    </div>
  )
}

export default Home
