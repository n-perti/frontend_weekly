import { useState } from "react";

const CreateCommerce = () => {
  const [name, setName] = useState("");
  const [cif, setCif] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pageId, setPageId] = useState(1);

  const handleCreate = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:3000/api/commerces/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ name, cif, address, email, phone, pageId }),
    });
    const newCommerce = await response.json();
    console.log(newCommerce);
  };

  return (
    <form onSubmit={handleCreate} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Crear Comercio</h2>
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">CIF</label>
          <input
            type="text"
            value={cif}
            onChange={(e) => setCif(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Dirección</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Teléfono</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Page ID</label>
          <input
            type="number"
            value={pageId}
            onChange={(e) => setPageId(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Crear
      </button>
    </form>
  );
};

export default CreateCommerce;