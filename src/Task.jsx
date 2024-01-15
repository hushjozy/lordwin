import React, { useEffect, useState } from "react";
import LabeledInput from "./components/LabeledInput";
import RadioButton from "./components/RadioButton";

const Task = () => {
  const savedTasks = localStorage.getItem("tasks");
  const [tasks, setTasks] = React.useState([]);
  const [input, setInput] = React.useState({});
  const [hoverButton, setHoverButton] = React.useState(null);
  const [formErrors, setFormErrors] = useState({});

  const currentDate = new Date();
  const options = { weekday: "long", day: "numeric", year: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    currentDate
  );

  async function handleTaskAddition() {
    const id = await generateTransactionRef(12);
    const newTasks = [...tasks, { ...input, id: id, createdAt: formattedDate }];
    setTasks(newTasks);
    setInput({});
    await localStorage.setItem("tasks", JSON.stringify(newTasks));
  }
  async function handleTaskRemove(task) {
    const newTasks = tasks.filter((t) => t !== task);
    setTasks(newTasks);
    await localStorage.setItem("tasks", JSON.stringify(newTasks));
  }
  async function handleTaskEdit(task) {
    const newTasks = tasks.filter((t) => t !== task);
    setTasks(newTasks);
    setInput((prevInput) => ({ ...prevInput, ...task }));
    // await localStorage.setItem("tasks", [...newTasks, input]);
  }
  const generateTransactionRef = (length) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return `lordwin_${result}`;
  };
  useEffect(() => {
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      setTasks(parsedTasks);
    }
  }, []);
  const validateForm = () => {
    const errors = {};

    // Validate title (Example: Title is required)
    if (!input?.title?.trim()) {
      errors.title = "Title is required";
    }
    if (!input?.description?.trim()) {
      errors.description = "Description is required";
    }
    // Add more validation rules for other fields if needed

    setFormErrors(errors);

    // Return true if there are no errors
    return Object.keys(errors).length === 0;
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        gap: 30,
      }}
    >
      <form>
        <LabeledInput
          labelText={"Title"}
          onChange={(e) => {
            setInput((prevInput) => {
              return { ...prevInput, title: e.target.value };
            });
          }}
          value={input?.title}
          placeholder="Enter Title"
        />
        <LabeledInput
          labelText={"Description"}
          onChange={(e) => {
            setInput((prevInput) => {
              return { ...prevInput, description: e.target.value };
            });
          }}
          value={input?.description}
          placeholder="Enter Description"
        />
        <RadioButton
          label={"Completed"}
          onClick={(e) => {
            console.log(input?.completed);
            setInput((prevInput) => {
              return {
                ...prevInput,
                completed: input?.completed ? false : true,
              };
            });
          }}
          value={input?.completed}
        />

        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();

            if (validateForm()) {
              handleTaskAddition();
            }
          }}
        >
          Save Task
        </button>
      </form>
      <ol>
        {tasks?.map((task, i) => {
          return (
            <li
              onMouseOver={() => setHoverButton(i)}
              onMouseOut={() => setHoverButton(null)}
              style={{
                display: "flex",
                flexDirection: "row",
                width: "60vw",
                height: "30px",
                fontSize: "16px",
                textTransform: "capitalize",
                gap: 20,
              }}
            >
              <p>{task.title}</p> <p>{task.description}</p>{" "}
              <p>{task.completed ? "true" : "false"}</p>
              {hoverButton === i && (
                <div>
                  <button
                    onClick={() => {
                      handleTaskRemove(task);
                    }}
                  >
                    {" "}
                    Delete
                  </button>{" "}
                  <button
                    onClick={() => {
                      handleTaskEdit(task);
                    }}
                  >
                    {" "}
                    Edit
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Task;
