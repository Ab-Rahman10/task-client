import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { io } from "socket.io-client";

const socket = io("https://task-server-6u11.onrender.com");

const Task = () => {
  const [newTask, setNewTask] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("To-Do");

  // Editing state
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedCategory, setEditedCategory] = useState("");

  const categories = ["To-Do", "In Progress", "Done"];

  // getting all tasks from db
  const { data: allTasks = [], refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const data = await axios.get(
        "https://task-server-6u11.onrender.com/tasks"
      );
      return data.data;
    },
  });

  // real-time updates from the backend
  useEffect(() => {
    socket.on("taskUpdated", () => {
      console.log("Socket event: taskUpdated received");
      refetch();
    });
    socket.on("taskAdded", () => {
      console.log("Socket event: taskAdded received");
      refetch();
    });
    socket.on("taskDeleted", () => {
      console.log("Socket event: taskDeleted received");
      refetch();
    });
    return () => {
      socket.off("taskUpdated");
      socket.off("taskAdded");
      socket.off("taskDeleted");
    };
  }, [refetch]);

  // task store in db
  const addTask = async () => {
    if (!newTask.trim()) return;

    const task = {
      title: newTask,
      description,
      category,
      timestamp: new Date().toISOString(),
    };

    try {
      const result = await axios.post(
        "https://task-server-6u11.onrender.com/task",
        task
      );
      console.log(result);
      refetch();
    } catch (error) {
      console.log("Adding Problem", error);
    }

    setNewTask("");
    setDescription("");
  };

  // removing a task
  const handleDeleteTask = async (id) => {
    try {
      const result = await axios.delete(
        `https://task-server-6u11.onrender.com/task/${id}`
      );
      console.log(result);
      refetch();
    } catch (error) {
      console.log("Deleting error", error);
    }
  };

  // Turn on edit mode: Set all data in the current task to editing state
  const handleEditTask = (task) => {
    setEditingId(task._id);
    setEditedTitle(task.title);
    setEditedDescription(task.description);
    setEditedCategory(task.category);
  };

  // Editing a task
  const handleSaveTask = async (id) => {
    const updatedTask = {
      title: editedTitle,
      description: editedDescription,
      category: editedCategory,
      timestamp: new Date().toISOString(),
    };

    try {
      const result = await axios.patch(
        `https://task-server-6u11.onrender.com/task/${id}`,
        updatedTask
      );
      console.log(result);
      refetch();

      // close editing mode:
      setEditingId(null);
      setEditedTitle("");
      setEditedDescription("");
      setEditedCategory("");
    } catch (error) {
      console.log("Patching task error", error);
    }
  };

  return (
    <div className="w-11/12 max-w-7xl lg:w-9/12 mx-auto py-6 mb-10">
      {/* Input Section for new task */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          className="flex-grow rounded-lg border border-gray-300 p-3"
          placeholder="Enter task title..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <input
          type="text"
          className="flex-grow rounded-lg border border-gray-300 p-3"
          placeholder="Enter description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex gap-3">
          <select
            className="rounded-lg border border-gray-300 p-3"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button
            className="rounded-lg bg-blue-500 px-5 py-3 text-white"
            onClick={addTask}
          >
            Add
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div key={cat} className="p-4 rounded-lg shadow-lg bg-white">
            <h3 className="mb-3 text-lg font-semibold text-gray-700 border-b pb-2">
              {cat}
            </h3>

            <ul>
              {allTasks
                .filter((task) => task.category === cat)
                .map((task) => (
                  <li
                    key={task._id}
                    className="mb-2 flex flex-col items-start rounded-lg bg-gray-100 p-3"
                  >
                    {editingId === task._id ? (
                      <>
                        {/* Title input */}
                        <input
                          type="text"
                          className="w-full bg-white border p-1 text-gray-700 mb-2"
                          value={editedTitle}
                          onChange={(e) => setEditedTitle(e.target.value)}
                        />

                        {/* Description input */}
                        <input
                          type="text"
                          className="w-full bg-white border p-1 text-gray-700 mb-2"
                          value={editedDescription}
                          onChange={(e) => setEditedDescription(e.target.value)}
                        />

                        {/* Category select */}
                        <select
                          className="w-full bg-white border p-1 text-gray-700"
                          value={editedCategory}
                          onChange={(e) => setEditedCategory(e.target.value)}
                        >
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center justify-between w-full">
                          <h3 className="text-gray-700 font-bold">
                            {task.title}
                          </h3>
                          <p
                            className={` font-semibold inline-flex items-center gap-3 ${
                              task.category === "To-Do"
                                ? "text-blue-400"
                                : task.category === "In Progress"
                                ? "text-yellow-500"
                                : "text-green-400"
                            }`}
                          >
                            {task.category}
                            {task.category === "To-Do"
                              ? "📝"
                              : task.category === "In Progress"
                              ? "⏳"
                              : "✅"}
                          </p>
                        </div>

                        {task.description && (
                          <p className="text-sm text-gray-500">
                            {task.description}
                          </p>
                        )}
                      </>
                    )}

                    <div className="flex justify-between w-full mt-2">
                      <span className="text-xs text-gray-400">
                        {new Date(task.timestamp).toLocaleString()}
                      </span>
                      <div className="flex gap-4">
                        {editingId === task._id ? (
                          <button
                            className="text-green-500 hover:text-green-600"
                            onClick={() => handleSaveTask(task._id)}
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            className="text-blue-500 hover:text-blue-600"
                            onClick={() => handleEditTask(task)}
                          >
                            <MdEdit className="text-2xl" />
                          </button>
                        )}
                        <button
                          className="text-red-500 hover:text-red-600"
                          onClick={() => handleDeleteTask(task._id)}
                        >
                          <FaRegTrashAlt className="text-2xl" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Task;
