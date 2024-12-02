// src/components/DeleteWebCommerce.jsx
const DeleteWebCommerce = ({ commerceToken, cif}) => {
  const handleDelete = async () => {
    const response = await fetch(`http://localhost:3000/api/webCommerce/${cif}?action=delete`, {
      method: "DELETE",
      headers: {
        "Authorization":`${commerceToken}`,
      },
    });
    if (response.ok) {
      console.log("WebCommerce deleted");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Eliminar WebCommerce</h2>
      <div className="mb-2">
        <span>{cif}</span>
        <button
          onClick={handleDelete}
          className="ml-4 bg-red-500 text-white py-1 px-2 rounded-md shadow-sm hover:bg-red-700"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default DeleteWebCommerce;