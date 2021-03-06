const Todo = require('../models/todo.model');

exports.list = (req, res) => {
  const { todos } = req.user;
  const formattedTodos = todos
    ? todos.map((todo) => {
      todo.id = todo._id;
      delete todo._id;
      return todo;
    })
    : [];

  res.json({
    todos: formattedTodos,
  });
};

exports.create = async (req, res) => {
  const { description } = req.body;

  try {
    if (!description || typeof description !== 'string') throw new Error('incorrect payload format, expected "description: <non-empty-string>"');
    const todo = new Todo({ description });
    req.user.todos.push(todo);
    await req.user.save();
    res.json({
      message: 'Todo added!',
    });
  } catch (err) {
    res
      .status(400)
      .json({
        message: err.toString(),
      });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const { todos } = req.user;

  try {
    const todo = todos.id(id);
    if (!todo) throw new Error(`todo with id: ${id} doesn't exisit`);
    if (completed === undefined || typeof completed !== 'boolean') throw new Error('incorrect payload format, expected "completed: <boolean>"');
    todo.set({ completed });
    await req.user.save();
    res.json({
      message: 'Todo updated!',
    });
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({
        message: err.toString(),
      });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  const { todos } = req.user;

  try {
    const todo = todos.id(id);
    if (!todo) throw new Error(`todo with id: ${id} doesn't exisit`);
    todo.remove();
    await req.user.save();
    res.json({
      message: 'Todo deleted!',
    });
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({
        message: err.toString(),
      });
  }
};
