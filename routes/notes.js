const express = require("express");
const fetchuser = require("../middleware/Fetchuser");
const router = express.Router();
const Notes = require("../models/Notes");
const Data = require("../models/Data");
const Delivery = require("../models/Delivery");
const { body, validationResult } = require("express-validator");
//Route 1:  Get all the notes login require
router.get("/fetchallNotes", fetchuser, async (req, res) => {
    try{
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    }
    catch(error){
        console.log(error.message);
        res.status(500).send('INTERNAL SERVER ERROR 1');
    }
});
//Route 2:  Add a new note login require
router.post(
  "/addNote",
  fetchuser,
  async (req, res) => {
    try {
      const { image,name,category, price, note_id} = req.body;
      const number = 1,payment = price,order = 'cart';
      const note = {
        image,
        name,
        payment,
        order,
        number,
        note_id: note_id,
        category,
        price,
        user: req.user.id,
      };
      const savedNote = await Notes.create(note);
      const notes = await Notes.find({ user: req.user.id });
      res.json(savedNote);
    } catch (error) {
        console.log(error.message);
      res.status(500).send("INTERNAL SERVER ERROR");
    }
  }
);
//Route 3:  Update an existing note
router.put('/updatenotes/:id',fetchuser, async (req,res)=>{
const {user,image,name,category,price,val,order} = req.body;
//find the note to be updated
let note = await Notes.find({_id: req.params.id});
if(!note){
   return res.status(404).send("NOT FOUND");
}
if(note[0].user.toString() !== req.user.id){
    return res.status(401).send("Unauthorized access");
}
//creation a newNote object
const newNote = {};
if(user){
    newNote.user = user;
}
if(image){
    newNote.image = image;
}
if(name){
    newNote.name = name;
}
if(val===1){
  newNote.number = note[0].number + 1;
  newNote.payment =  (note[0].number+1)*note[0].price;
}
else{
newNote.number = note[0].number - 1;
newNote.payment =  (note[0].number-1)*note[0].price;
}
  newNote.order = order;
if(category){
  newNote.category = category;
}
if(price){
  newNote.price = price;
}
note = await Notes.findByIdAndUpdate(note[0]._id,{$set: newNote},{new:true});
res.json({note});
});
//Route 4:  Delete a note
router.delete('/deleteNote/:id',fetchuser, async (req,res)=>{
    let note = await Notes.findById(req.params.id);

    if(!note){
        return res.status(404).send("NOT FOUND");
     }
     
     if(note.user.toString() !== req.user.id){
         return res.status(401).send("Unauthorized access");
     }
     note = await Notes.findByIdAndDelete(req.params.id);
     res.json({"success":"note has been deleted"});
});
//Route 5: Data
router.get('/Data',async(req,res)=>{
  try{
    const notes = await Data.find();
    res.json(notes);
}
catch(error){
    console.log(error.message);
    res.status(500).send('INTERNAL SERVER ERROR 1');
}
});

router.get('/Data1/:id', async (req,res)=>{
  try{
  let note = await Data.findById(req.params.id);
  if(!note){
      return res.status(404).send("NOT FOUND");
   }
   res.json(note);
  }
  catch(error){
    console.log(error.message);
    res.status(500).send("INTERNAL SERVER ERROR 1");
  }
});

/***************************************************************************/
//Routes for accessing the orders

//Route 1:  Add a new order login require
router.post(
  "/addOrder",
  fetchuser,
  async (req, res) => {

    try {
      const { payment, notes_id, add, pin, number, CN,NC, expire} = req.body;
      let array = [];
      notes_id.map((item)=>{
      array.push(item);
      return item;
    });
      const order = {
       user: req.user.id,
       payment: payment,
       address: add,
       number: number,
       pin: pin,
       Card_number: CN,
       Name_card: NC,
       Expire: expire,
       order: array
      };
      const savedNote = await Delivery.create(order);
      // const notes = await Delivery.find({ user: req.user.id });
      res.json(savedNote);

    } catch (error) {
        console.log(error.message);
      res.status(500).send("INTERNAL SERVER ERROR");
    }
  }
);


//Route 2:  To return the orders placed by a specific user
router.get(
  "/checkOrder",
  fetchuser,
  async (req, res) => {
    try {
      const notes = await Delivery.find({ user: req.user.id });
      res.json(notes);
    } catch (error) {
        console.log(error.message);
      res.status(500).send("INTERNAL SERVER ERROR");
    }
  }
);

module.exports = router;
