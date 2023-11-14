const router = require('express').Router();
const TodoController = require('../controllers/todo_controller') ;

router.post('/create',TodoController.validateBody,TodoController.createTodo);
router.get('/getAllTodos',TodoController.getAllTodos);
router.get('/getProgress',TodoController.getProgress);
router.delete('/deleteTodo',TodoController.validateId,TodoController.deleteTodo);
router.post('/updateTodo',TodoController.validateId,TodoController.updateTodoStatus);

module.exports = router;