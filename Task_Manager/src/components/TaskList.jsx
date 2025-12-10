import TaskCard from "./TaskCard";

export default function TaskList({
  tasks,
  deleteTask,
  setCurrentTask,
  setIsModalOpen,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      {tasks.length === 0 ? (
        <p className="text-gray-400 col-span-full text-center">No tasks found</p>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={() => {
              setCurrentTask(task);
              setIsModalOpen(true);
            }}
            onDelete={() => deleteTask(task.id)}
          />
        ))
      )}

    </div>
  );
}
