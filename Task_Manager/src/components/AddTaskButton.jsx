export default function AddTaskButton({ openModal }) {
  return (
    <button
      onClick={openModal}
      className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition"
    >
      +
    </button>
  );
}