const router = require('express').Router();
const TodoController = require('../controllers/todo_controller') ;

router.post('/create',TodoController.createTodo);
router.get('/getAllTodos',TodoController.getAllTodos);
router.get('/getProgress',TodoController.getProgress);
router.delete('/deleteTodo',TodoController.deleteTodo);
router.post('/updateTodo',TodoController.updateTodoStatus);

module.exports = router;