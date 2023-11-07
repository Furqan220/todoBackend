const TodoServices = require('../services/todo_service');

exports.createTodo = async (req, res, next) => {
    try {
        const { userId, title, desc } = req.body;
        TodoServices.createTodo(userId, title, desc).then((result) => {
            return res.status(200).json({ status: true, success: "Todo Created Successfully", data: result });


        }).catch((e) => {
            console.error(error);
            return res.status(400).json({ status: false, error: error.toString() });

        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, error: error.toString() });
        
    }
}
exports.getAllTodos = async (req, res, next) => {
    try {
        const {userId} = req.body;
       await TodoServices.getAllTodos(userId).then((data) => {
        console.log(data)

            return res.status(200).json({ status: true, success: "Todos Fetched Successfully", data: data });
        }).catch((error) => {
            console.error(error);
            return res.status(400).json({ status: false, error: error.toString() });

        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, error: error.toString() });
        
    }
}
exports.deleteTodo = async (req, res, next) => {
    try {
        const {id} = req.body;
       await TodoServices.deleteTodo(id).then((data) => {

            if (data !== null) {
                return res.status(200).json({ status: true, success: "Todo Deleted Successfully"});
            } else {
                return res.status(404).json({ status: true, success: "Todo Not Found"});
            }
        }).catch((error) => {
            console.error(error);
            return res.status(400).json({ status: false, error: error.toString() });

        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, error: error.toString() });
        
    }


}
