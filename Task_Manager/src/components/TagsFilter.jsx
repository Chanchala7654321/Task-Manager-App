const tags = [
  { label: "all", bg: "bg-indigo-100", text: "text-indigo-700" },
  { label: "work", bg: "bg-gray-100", text: "text-gray-700" },
  { label: "personal-work", bg: "bg-green-100", text: "text-green-700" },
  { label: "goal", bg: "bg-yellow-100", text: "text-yellow-700" },
  { label: "completed", bg: "bg-purple-100", text: "text-purple-700" },
];

export default function TagsFilter({ filter, setFilter }) {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      {tags.map((tag) => (
        <span
          key={tag.label}
          onClick={() => setFilter(tag.label)}
          className={`px-3 py-1 rounded-full cursor-pointer transition ${
            filter === tag.label
              ? `${tag.bg.replace("100", "600")} text-white`
              : `${tag.bg} ${tag.text}`
          }`}
        >
          {tag.label[0].toUpperCase() + tag.label.slice(1)}
        </span>
      ))}
    </div>
  );
}
