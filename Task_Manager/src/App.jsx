import { useState, useEffect } from "react";


import Login from "./auth/Login";
import Signup from "./auth/Signup";


import Header from "./components/Header";
import TagsFilter from "./components/TagsFilter";
import TaskList from "./components/TaskList";
import AddTaskButton from "./components/AddTaskButton";
import TaskEditor from "./components/TaskEditor";

export default function App() {

  const [page, setPage] = useState("login"); 
  const [user, setUser] = useState(null); 

 
  const getTasksKey = (email) => `tasks_${email}`;

 
  const saveTasksToLocalStorage = (currentTasks, email) => {
    if (email) {
      localStorage.setItem(getTasksKey(email), JSON.stringify(currentTasks));
    }
  };

 
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

 
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setPage("tasks");
     
      setTasks(loadTasksFromLocalStorage(userData.email)); 
    }
  }, []); 
  useEffect(() => {
    if (user) {
      saveTasksToLocalStorage(tasks, user.email);
    }
  }, [tasks, user]); 

  
  const handleSignup = (userData) => {
    
    localStorage.setItem("user", JSON.stringify(userData));
    alert("Signup successful! You can now log in.");
    setPage("login");
  };

  
  const handleLogin = () => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    setUser(savedUser);
    setPage("tasks");
    
    setTasks(loadTasksFromLocalStorage(savedUser.email));
  };

  
  const handleLogout = () => {
    setUser(null);
    setTasks([]); 

    setPage("login");
  };

 
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


  const filteredTasks = tasks.filter((task) => {
    const matchSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.content.toLowerCase().includes(search.toLowerCase());

    const matchTag = filter === "all" ? true : task.tag === filter;

    return matchSearch && matchTag;
  });


  if (page === "login")
    return <Login onLogin={handleLogin} setPage={setPage} />;

  if (page === "signup")
    return <Signup onSignup={handleSignup} setPage={setPage} />;


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
