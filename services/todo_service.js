const TodoModel = require('../models/todo_model');


class TodoServices {

    static async createTodo(userId, title, desc, category) {
        const createTodo = new TodoModel({ userId, title, desc, category });
        return await createTodo.save();
    }

    static async getAllTodos(userId) {
        try {
            const todos = await TodoModel.find({ 'userId': userId });
            //    console.log(todos);
            return todos;
        } catch (error) {
            throw new Error(error.toString());
        }
    }
    static async deleteTodo(id) {
        try {
            const deletedTodo = await TodoModel.findByIdAndDelete(id);
            // console.log(deletedTodo);      
            return deletedTodo;
        } catch (error) {
            throw new Error(error.toString());
        }
    }
    static async getSingleTodo(id) {
        try {
            const getSingleTodo = await TodoModel.findById(id);
            // console.log(deletedTodo);      
            return getSingleTodo;
        } catch (error) {
            throw new Error(error.toString());
        }
    }
    static async updateTodoStatus(id, isCompleted) {
        try {
            const updatedTodo = await TodoModel.findByIdAndUpdate(id, {isCompleted : isCompleted}, { new: true, runValidators: true });
            return updatedTodo;
        } catch (error) {
            throw new Error(error.toString());
        }
    }

}

module.exports = TodoServices;

