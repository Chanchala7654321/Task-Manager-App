import { useState } from "react";

export default function TaskEditor({ task, onSave, onClose }) {
  const [title, setTitle] = useState(task?.title || "");
  const [content, setContent] = useState(task?.content || "");
  const [tag, setTag] = useState(task?.tag || "work");

  const save = () => {
    // Optional: You could force the tag to lowercase here before saving
    // const lowercasedTag = tag.toLowerCase(); 

    onSave({
      id: task?.id,
      title,
      content,
      tag,
      createdAt: task?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-xl animate-fade-in">

        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          {task ? "Edit Task" : "New Task"}
        </h2>

        <input
          className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-indigo-300 focus:outline-none"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full p-3 border rounded-lg mb-4 h-40 resize-none focus:ring-2 focus:ring-indigo-300 focus:outline-none"
          placeholder="Write your task here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="mb-4">
          <label className="mr-2 font-medium">Tag:</label>
          <select
            className="border p-2 rounded-md"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          >
            <option value="work">Work</option>
            {/* Standardized to lowercase 'personal-work' */}
            <option value="personal-work">Personal-Work</option>
            {/* Standardized to lowercase 'goal' */}
            <option value="goal">Goal</option>
            {/* Standardized to lowercase 'completed' */}
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={save}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
}
