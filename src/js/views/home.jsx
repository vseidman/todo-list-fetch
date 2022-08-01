import React, { useEffect, useState } from "react";

const Home = () => {
  const [listTask, setListTask] = useState([]);

  const [task, setTask] = useState({
    label: "",
    done: false,
  });

  const urlBase = `http://assets.breatheco.de/apis/fake/todos/user`
  const userBase = "Victor"

  const getTodos = async () => {
    try {
      let response = await fetch(`${urlBase}/${userBase}`)
      let data = await response.json()
      if (response.status !== 404) {
        setListTask(data)
      } else {
        let responseTodos = await fetch(`${urlBase}/${userBase}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify([])
        })
        if(responseTodos.ok){
          getTodos()
        }
      }
    } catch (error) {
      console.log(`Un error: ${error}`)
    }
  }

  const saveTask = async (event) => {
    if (task.label.trim() !== "") {
      try {
        let response = await fetch(`${urlBase}/${userBase}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify([...listTask, task])
        })
        if(response.ok){
          getTodos()
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log("Los campos son obligatorios")
    }
  }
  const removeTask = (id) => {
    let newList = listTask.filter((item, index) => {
      if (id !== index) {
        return item;
      }
    });

    setListTask(newList);
    setTask({ ...task, label: "" });
  };

  const handleKey = (event) => {
    if (event.key === "Enter") {
      saveTask();
    }
  };

  const handleChange = (event) => {
    setTask({ ...task, [event.target.name]: event.target.value });
  };
  useEffect(() => {getTodos()}, 
  [])

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
              name="label"
              value={task.label}
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
                          <p>{tarea.label}</p>
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
