


import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();

const port = process.env.PORT || 7000;


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!...');
  })
  .catch((err) => {
    console.log(err);
  });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number
});

const userModel = mongoose.model("students", userSchema);

// Get students
app.get("/getstudents", (req, res) => {
  userModel.find({})
    .then(students => res.json(students))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.get("/",(req,res)=>{
   res.send("hello world")
})

// Create student
app.post("/students", (req, res) => {
  userModel.create(req.body)
    .then(student => res.json(student))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

// Delete student
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  userModel.findByIdAndDelete(id)
    .then(result => res.json(result))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

// Read student
app.get("/Read/:id", (req, res) => {
  const id = req.params.id;
  userModel.findById(id)
    .then(student => res.json(student))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

// Update student
app.put('/update/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  userModel.findByIdAndUpdate(id, updatedData, { new: true })
    .then(student => res.json(student))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.listen(port, () => {
  console.log(`Server is listening on ${port}....`);
});
