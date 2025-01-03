const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.static('dist'));


let notes = [
      {
        id: 1,
        content: "HTML is easy",
        important: true
      },
      {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false
      },
      {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
      }
]

app.use(express.json());


app.get('/',(request,response) => {
    response.send('hello world')
})

app.get('/api/notes', (req, resp) =>{
    resp.json(notes)
} )

app.get('/api/notes/:id',(req, res) => {
  const id = Number(req.params.id);
  console.log(id);
  const note = notes.find(note => note.id == id);
  //console.log(notes.at(0).id);
  if(note){
    res.json(note);
  }
  else{
    res.statusMessage = "note doesn't exist"
    res.status(404).end();
  }
  //console.log(id === notes.at(0).id);
})

app.delete('/api/notes/:id',(req, res)=>{
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)
  res.status(204).end();
  //console.log(notes);
})

app.post('/api/notes', (req, res)=>{
  const max = Math.max(...notes.map(note => note.id));
  //console.log(max);
  const id  = max+1;
  
  const request = req.body;
  const newNote = {...request, id: id}
  //console.log(typeof req.body);
  notes = [...notes, newNote]
  //console.log(notes);
  res.json(newNote);
})

const PORT = process.env.PORT || 3001
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
