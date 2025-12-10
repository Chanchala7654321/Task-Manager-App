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
  const [user, setUser] = useState(null); // Stores the logged-in user object {name, email, password}

  // --- LOCAL STORAGE HELPERS ---

  // Function to get the tasks key based on the current user's email
  const getTasksKey = (email) => `tasks_${email}`;

  // Function to save tasks for the current user
  const saveTasksToLocalStorage = (currentTasks, email) => {
    if (email) {
      localStorage.setItem(getTasksKey(email), JSON.stringify(currentTasks));
    }
  };

  // Function to load tasks for a specific user email
  const loadTasksFromLocalStorage = (email) => {
    if (email) {
      const savedTasks = localStorage.getItem(getTasksKey(email));
      return savedTasks ? JSON.parse(savedTasks) : [];
    }
    return [];
  };
  
  // ---------------- TASK STATES ----------------
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  // --- EFFECTS & HANDLERS ---

  // Auto-login & Load user on app start
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setPage("tasks");
      // Load tasks for this specific user immediately after setting the user
      setTasks(loadTasksFromLocalStorage(userData.email)); 
    }
  }, []); // Run only once on mount

  // Sync tasks to localStorage whenever the 'tasks' state changes (and a user is logged in)
  useEffect(() => {
    if (user) {
      saveTasksToLocalStorage(tasks, user.email);
    }
  }, [tasks, user]); // Depend on tasks and user state

  // Signup (Saves user credentials to generic 'user' key)
  const handleSignup = (userData) => {
    // Note: This approach only supports one registered user at a time as it overwrites the 'user' key
    localStorage.setItem("user", JSON.stringify(userData));
    alert("Signup successful! You can now log in.");
    setPage("login");
  };

  // Login (Sets user state and loads user-specific tasks)
  const handleLogin = () => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    setUser(savedUser);
    setPage("tasks");
    // Load the correct tasks for the newly logged-in user
    setTasks(loadTasksFromLocalStorage(savedUser.email));
  };

  // Logout (Clears user state and tasks from UI)
  const handleLogout = () => {
    setUser(null);
    setTasks([]); // Clear tasks when logging out
    // We don't delete the tasks from localStorage here, just clear UI state
    setPage("login");
  };

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
