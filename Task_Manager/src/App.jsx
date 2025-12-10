import { useState, useEffect } from "react";

// Auth Components
import Login from "./auth/Login";
import Signup from "./auth/Signup";

// Task App Components
import Header from "./components/Header";
import TagsFilter from "./components/TagsFilter";
import TaskList from "./components/TaskList";
import AddTaskButton from "./components/AddTaskButton";
import TaskEditor from "./components/TaskEditor";

export default function App() {
  // ---------------- AUTH STATES ----------------
  const [page, setPage] = useState("login"); // login | signup | tasks
  const [user, setUser] = useState(null);

  // Auto-login
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      setUser(JSON.parse(saved));
      setPage("tasks");
    }
  }, []);

  // Signup
  const handleSignup = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    alert("Signup successful!");
    setPage("login");
  };

  // Login
  const handleLogin = () => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    setUser(savedUser);
    setPage("tasks");
  };

  // Logout
  const handleLogout = () => {
    setUser(null);
    setPage("login");
  };

  // ---------------- TASK STATES ----------------
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  // Load tasks
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  // Save tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add / Update Task
  const addOrUpdateTask = (task) => {
    if (task.id) {
      setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    } else {
      setTasks([{ ...task, id: Date.now().toString() }, ...tasks]);
    }
    setIsModalOpen(false);
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // ---------------- FILTER + SEARCH ----------------
  const filteredTasks = tasks.filter((task) => {
    const matchSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.content.toLowerCase().includes(search.toLowerCase());

    const matchTag = filter === "all" ? true : task.tag === filter;

    return matchSearch && matchTag;
  });

  // ---------------- PAGE SWITCH ----------------
  if (page === "login")
    return <Login onLogin={handleLogin} setPage={setPage} />;

  if (page === "signup")
    return <Signup onSignup={handleSignup} setPage={setPage} />;

  // ---------------- TASK UI ----------------
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">

      <Header
        search={search}
        setSearch={setSearch}
        user={user}
        setPage={setPage}
        handleLogout={handleLogout}
      />

      <TagsFilter filter={filter} setFilter={setFilter} />

      <TaskList
        tasks={filteredTasks}
        setCurrentTask={setCurrentTask}
        setIsModalOpen={setIsModalOpen}
        deleteTask={deleteTask}
      />

      <AddTaskButton
        openModal={() => {
          setCurrentTask(null);
          setIsModalOpen(true);
        }}
      />

      {isModalOpen && (
        <TaskEditor
          task={currentTask}
          onSave={addOrUpdateTask}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
