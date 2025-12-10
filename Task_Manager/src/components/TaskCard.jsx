import { FiEdit2, FiTrash2 } from "react-icons/fi";

export default function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all w-full">

      {/* Title + Tag */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-gray-900">{task.title}</h3>

        <span
          className={`px-3 py-1 text-sm rounded-full ${
            task.tag === "work"
              ? "bg-blue-100 text-blue-700"
              : task.tag === "personal-work"
              ? "bg-green-100 text-green-700"
              : task.tag === "goal"
              ? "bg-yellow-100 text-yellow-700"
              : task.tag === "completed"
              ? "bg-purple-100 text-purple-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {task.tag.charAt(0).toUpperCase() + task.tag.slice(1)}
        </span>
      </div>

      {/* Content */}
      <p className="text-gray-600 mb-4">{task.content}</p>

      {/* Footer */}
      <div className="flex justify-between items-center text-gray-500 text-sm">
        <span>{new Date(task.createdAt).toLocaleDateString()}</span>

        <div className="flex gap-4 text-gray-600">
          <button onClick={onEdit} className="hover:text-indigo-600">
            <FiEdit2 size={18} />
          </button>
          <button onClick={onDelete} className="hover:text-red-500">
            <FiTrash2 size={18} />
          </button>
        </div>
      </div>

    </div>
  );
}
