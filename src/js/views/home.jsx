import React, { useState } from "react";

const Home = () => {
  const [listTask, setListTask] = useState([]);

  const [task, setTask] = useState({
    task: "",
    isDone: false,
  });

  const saveTask = () => {
    if (task.task.trim() !== "") {
      setListTask([...listTask, task]);

      setTask({
        task: "",
        isDone: false,
      });
    }
  };

  const removeTask = (id) => {
    let newList = listTask.filter((item, index) => {
      if (id !== index) {
        return item;
      }
    });

    setListTask(newList);
    setTask({ ...task, task: "" });
  };

  const handleKey = (event) => {
    if (event.key === "Enter") {
      saveTask();
    }
  };

  const handleChange = (event) => {
    setTask({ ...task, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="container-fluid d-flex justify-content-center my-3">
        <div className="row">
          <div className="d-flex justify-content-center col-12">
            <h1>Task List</h1>
          </div>
        </div>
      </div>
      <div className="container-fluid d-flex flex-column text-center justify-content-center align-items-center">
        <div className="row card py-2 shadow-lg">
          <div className="col-12 d-flex justify-content-center flex-column">
            <input
              name="task"
              value={task.task}
              onChange={handleChange}
              type="text"
              className="align-text-center text-center p-3 border-0"
              placeholder="Press enter to add a task"
              onKeyDown={handleKey}
            />

            <div className="container-fluid">
              <div className="row">
                <div className="col-12 my-3">
                  <div className="border-bottom items border-0">
                    {listTask.length <= 0
                      ? "No tasks, add a task"
                      : +listTask.length + " items left"}
                  </div>
                  {listTask.map((tarea, index) => {
                    return (
                      <div
                        key={index}
                        className="border-bottom d-flex justify-content-between align-item-center py-2"
                      >
                        <div className="task-list">
                          <p>{tarea.task}</p>
                        </div>
                        <div>
                          <button
                            onClick={() => {
                              removeTask(index);
                            }}
                            type="button"
                          >
                            <i className="fas fa-minus"></i>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
