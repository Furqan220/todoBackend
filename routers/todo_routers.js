const router = require('express').Router();
const TodoController = require('../controllers/todo_controller') ;

router.post('/create',TodoController.createTodo);
router.get('/getAllTodos',TodoController.getAllTodos);
router.delete('/deleteTodo',TodoController.deleteTodo);

module.exports = router;