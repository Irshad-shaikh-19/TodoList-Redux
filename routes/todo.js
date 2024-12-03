const express = require('express')
const router = express.Router()
const Todo = require('../models/todo')


//Get All Todos
router.get('/get-todos', async (req, res) => {
    try {
      const todos = await Todo.find();
      res.status(200).json(todos);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch todos', error: err });
    }
  });


//Add Todo
router.post('/add-todo', async (req, res) => {
    const {text} = req.body
    try {
      const newTodo = new Todo({
        text
      });
      await newTodo.save();
      res.status(201).json(newTodo);
    } catch (err) {
      res.status(500).json({ message: 'Failed to add todo', error: err });
    }
  });



  //Update Todo
  router.put('/update-todo/:id', async (req, res) => {
    try {
      const updatedTodo = await Todo.findByIdAndUpdate(
        req.params.id,
        { text: req.body.text, completed: req.body.completed },
        { new: true }
      );
      if (!updatedTodo) return res.status(404).json({ message: 'Todo not found' });
      res.status(200).json({ message: "Todo updated successfully", updatedTodo });
    } catch (err) {
      res.status(500).json({ message: 'Failed to update todo', error: err });
    }
  });
  


//Delete Todo
router.delete('/delete-todo/:id', async (req, res) => {
    try {
      const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
      if (!deletedTodo) return res.status(404).json({ message: 'Todo not found' });
      res.status(200).json({message:"Todo updated Successfully ",deletedTodo});
    } catch (err) {
      res.status(500).json({ message: 'Failed to delete todo', error: err });
    }
  });



module.exports = router