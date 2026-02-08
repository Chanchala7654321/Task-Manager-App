export default function AddNoteButton({ openModal }) {
  return (
    <button
      onClick={openModal}
      className="fixed bottom-8 right-8 bg-indigo-600 text-white w-14 h-14
                 rounded-full flex items-center justify-center"
    >
      +
    </button>
  );
}
