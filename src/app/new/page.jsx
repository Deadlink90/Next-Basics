"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const PageForm = ({ params }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    const getTask = async () => {
      const res = await fetch(`/api/tasks/${id}`);
      const data = await res.json();
      setTask(data);
    };

    if (id) {
      getTask();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      //update
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        body: JSON.stringify(task),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log("updated", data);
    } else {
      const res = await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log("created", data);
    }
    
    router.refresh();
    router.push("/");
  };

  const handleOnChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const deleteTask = async () => {
    if (confirm("Are you sure you want to delete this task?")) {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
      router.refresh();
      router.push('/');
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form
        className="bg-slate-950 p-10 lg:w-1/4 md:w-1/2 rounded-md"
        onSubmit={handleSubmit}
      >
        <label htmlFor="title" className="font-bold text-sm">
          Title
        </label>
        <input
          type="text"
          className="border border-gray-400 p-2 mb-4 w-full text-black rounded-md"
          placeholder="Type your title"
          id="title"
          name="title"
          onChange={handleOnChange}
          value={task.title}
        />
        <label htmlFor="description" className="font-bold text-sm">
          Description
        </label>

        <textarea
          name="description"
          id="description"
          rows="3"
          placeholder="Type a description"
          className="border border-gray-400 p-2 mb-4 w-full text-black rounded-md"
          onChange={handleOnChange}
          value={task.description}
        ></textarea>
        <div className="flex justify-between">
          <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded">
            {id ? <span>Update task</span> : <span>Add Task</span>}
          </button>
          {id && (
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={deleteTask}
            >
              Delete Task
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PageForm;
