import express from 'express'
import Note from '../models/Note.js'
import middleware from '../middleware/middleware.js';

const router = express.Router()

router.post('/add',middleware,async (req,res) => {
    console.log("Route /add accessed");
    console.log("User from middleware:", req.user);
    try{
        const {title,description} = req.body;
        
        const newNote = new Note({
            title,
            description,
            userId: req.user.id
        })
    
        await newNote.save()
    
        return res.status(200).json({success: true, message: "Note Created Successfully"})
       }catch(error){
        console.error("Error Details:", error);
        return res.status(500).json({success: false, message: "Error in adding Note"})
       }
})

router.get('/',middleware, async (req,res) => {
    try{
        console.log(req.user)
        const notes = await Note.find({userId: req.user.id})
        return res.status(200).json({success: true, notes})
    } catch(error){
        return res.status(500).json({success: false, message: "cannot retrive notes"})
    }
})

router.put("/:id", async (req,res) => {
    try{
        const {id} = req.params;
        const updateNote = await Note.findByIdAndUpdate(id, req.body)
        return res.status(200).json({success: true, updateNote})
    } catch(error){
        return res.status(500).json({success: false, message: "cannot update notes"})
    }

})
router.delete("/:id", async (req,res) => {
    try{
        const {id} = req.params;
        const updateNote = await Note.findByIdAndDelete(id, req.body)
        return res.status(200).json({success: true, updateNote})
    } catch(error){
        return res.status(500).json({success: false, message: "cannot delete notes"})
    }

})

export default router