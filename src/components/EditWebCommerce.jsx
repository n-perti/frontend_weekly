import { useState } from "react";

const UpdateWebCommerce = ({ commerceToken, cif }) => {
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [activity, setActivity] = useState("");
  const [summary, setSummary] = useState("");
  const [text, setText] = useState(["Introduction", "Details", "Conclusion"]);
  const [isArchived, setIsArchived] = useState(false);

  const handleCreate = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:3000/api/webCommerce/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${commerceToken}`,
      },
      body: JSON.stringify({
        city,
        activity,
        title,
        summary,
        text,
        commerceCIF: cif,
        isArchived,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data);
    } else {
      console.error(data);
    }
  };

  return (
    <form onSubmit={handleCreate} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Crear WebCommerce</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">Ciudad</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Actividad</label>
        <input
          type="text"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Título</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Resumen</label>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        ></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Texto</label>
        <textarea
          value={text.join("\n")}
          onChange={(e) => setText(e.target.value.split("\n"))}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        ></textarea>
      </div>
      <div className="flex items-center">
        <label className="block text-sm font-medium text-gray-700 mr-2">¿Archivado?</label>
        <input
          type="checkbox"
          checked={isArchived}
          onChange={(e) => setIsArchived(e.target.checked)}
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
      </div>
      <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Crear
      </button>
    </form>
  );
};

export default UpdateWebCommerce;