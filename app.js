const express=require('express');
const app=express();
const fs=require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
let data = [];
fs.readFile('./data/hospitaldata.json', (err, jsonData) => {
    if (!err) {
      data = JSON.parse(jsonData);
    }
  });
app.get('/items',(req,res)=>{
    res.json(data)
})
app.post('/items', (req, res) => {
    const newItem = req.body;
    data.push(newItem);
    res.json({ message: 'Item added successfully', item: newItem });
  
    saveData();
  });
 app.put('/items/:Hospital_Name', (req, res) => {
    const itemName = req.params.Hospital_Name;
    const index = data.findIndex(item => item.Hospital_Name === itemName);
  
    if (index !== -1) {
      const updatedItem = req.body;
      data[index] = updatedItem;
      res.json({ message: 'Item updated successfully', item: updatedItem });
      saveData();
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  });
 app.delete('/items/:Hospital_Name', (req, res) => {
    const itemName = req.params.Hospital_Name;
    const index = data.findIndex(item => item.Hospital_Name === itemName);
  
    if (index !== -1) {
      const deletedItem = data.splice(index, 1);
      res.json({ message: 'Item deleted successfully', item: deletedItem });
      saveData();
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  });
function saveData() {
    fs.writeFile('./data/hospitaldata.json', JSON.stringify(data), 'utf8', err => {
      if (err) {
        console.error('Error saving data:', err);
      }
    });
  }

const port=3000
app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})