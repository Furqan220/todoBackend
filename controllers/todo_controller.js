const TodoServices = require('../services/todo_service');

exports.validateBody = (req, res, next) => {
    if (!req.body.userId || !req.body.title || !req.body.desc || !req.body.category) {
        return res.status(400).json({ status: false, error: "Invalid Request Body" });
    }
    next();
}
exports.validateId = (req, res, next) => {
    if (!req.query.id) {
        return res.status(400).json({ status: false, error: "Missing Query Parameter id" });
    }
    TodoServices.getSingleTodo(req.query.id).then((data) => {

        if (!data) {
            return res.status(404).json({ status: true, success: "Todo Not Found" });
        }
        next();
    }).catch((error) => {
        console.error(error);
        return res.status(400).json({ status: false, error: error.toString() });

    });

}
exports.createTodo = (req, res, next) => {
    try {
        const { userId, title, desc, category } = req.body;
        TodoServices.createTodo(userId, title, desc, category).then((result) => {
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
exports.getProgress = (req, res, next) => {
    try {
        const { userId } = req.query;
        if (userId) {
            console.log("This is user id " + userId);
            TodoServices.getAllTodos(userId).then((data) => {
                console.log(data)
                if (data.length !== 0) {

                    // Group tasks by category
                    const tasksByCategory = data.reduce((acc, task) => {
                        if (!acc[task.category]) {
                            acc[task.category] = [];
                        }
                        acc[task.category].push(task);
                        return acc;
                    }, {});
                    console.log("todo categorized")
                    console.log(tasksByCategory)
                    // Calculate completion percentages for each category
                    const result = Object.keys(tasksByCategory).map(category => {
                        const totalTasks = tasksByCategory[category].length;
                        const completedTasks = tasksByCategory[category].filter(task => task.isCompleted);
                        const completedCount = completedTasks.length;
                        const percentage = totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0;

                        return {
                            category,
                            total: totalTasks,
                            completed: completedCount,
                            percentage: percentage
                        };
                    });

                    console.log(result);
                    return res.status(200).json({ status: true, success: "Progress Fetched Successfully", data: result });

                } else {
                    return res.status(200).json({ status: false, success: "No Todos Found", data: [] });

                }
            }).catch((error) => {
                console.error(error);
                return res.status(400).json({ status: false, error: error.toString() });

            });
        } else {
            res.status(400).send('Missing userId parameter');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, error: error.toString() });

    }
}
exports.getAllTodos = (req, res, next) => {
    try {
        const userId = req.query.userId;
        if (userId) {
            // console.log("This is user id " + userId);
            TodoServices.getAllTodos(userId).then((data) => {
                console.log(data)

                return res.status(200).json({ status: true, success: "Todos Fetched Successfully", data: data });
            }).catch((error) => {
                console.error(error);
                return res.status(400).json({ status: false, error: error.toString() });

            });
        } else {
            res.status(400).send('Missing userId parameter');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, error: error.toString() });

    }
}
exports.deleteTodo = (req, res, next) => {
    try {
        const { id } = req.query;
        TodoServices.deleteTodo(id).then((data) => {

            if (data !== null) {
                return res.status(200).json({ status: true, success: "Todo Deleted Successfully" });
            } else {
                return res.status(404).json({ status: true, success: "Todo Not Found" });
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
exports.updateTodoStatus = (req, res, next) => {
    try {
        const { id } = req.query;
        const { isCompleted } = req.body;
        if (id === null || id === undefined) {
            return res.status(400).json({ status: true, success: "Missing parameter is required" });
        }
        if (isCompleted === null || isCompleted === undefined) {
            return res.status(400).json({ status: true, success: "Missing data is required" });
        }
        TodoServices.updateTodoStatus(id, isCompleted).then((data) => {

            if (data !== null) {
                return res.status(200).json({ status: true, success: "Todo Updated Successfully" });
            } else {
                return res.status(404).json({ status: true, success: "Something went wrong" });
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
