const Task = require('../models/Task');

// Get all tasks for the authenticated user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
    try {
      // Ensure user ID is passed from the middleware (from protect)
      const userId = req.user.id;
  
      // Create task with user ID attached
      const newTask = new Task({
        ...req.body, // Spread the task data from the request body
        user: userId, // Attach the user ID
      });
  
      // Save task to the database
      const task = await newTask.save();
  
      res.json(task); // Return the created task
    } catch (error) {
      console.error(error.message);  // Log the error to the server logs
      res.status(500).json({ message: 'Server error', error: error.message });  // Send a 500 error with the error message
    }
  };

// Update a task
exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body; // Now expecting 'title', 'description', and 'completed'
    try {
      // Find the task by ID
      const task = await Task.findById(id);
  
      // Check if the task exists and if the logged-in user is the task owner
      if (!task || task.user.toString() !== req.user.id) {
        return res.status(404).json({ message: 'Task not found or unauthorized' });
      }
  
      // Update the title and description if they are provided in the request body
      if (title !== undefined) {
        task.title = title;
      }
      if (description !== undefined) {
        task.description = description;
      }
  
      // If 'completed' is passed, update the task's completed status
      if (completed !== undefined) {
        // Toggle between 'completed' and 'pending' based on the boolean 'completed'
        task.status = completed ? 'completed' : 'pending'; 
      }
  
      // Save the updated task
      const updatedTask = await task.save();
  
      // Respond with the updated task
      res.json(updatedTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error });
    }
  };  

// Delete a task
exports.deleteTask = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Check if the task exists
      const task = await Task.findById(id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      // Check if the task belongs to the authenticated user
      if (task.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'Not authorized' });
      }
      // Delete the task using findByIdAndDelete
      await Task.findByIdAndDelete(id);
  
      res.json({ message: 'Task removed' });
    } catch (error) {
      console.error(error);  // Log error for better debugging
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  