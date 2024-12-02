import { useState } from "react";

const UploadImage = ({ commerceToken, cif }) => {
  const [image, setImage] = useState(null);

  const handleImageUpload = async (event) => {
    event.preventDefault();
    if (!image) {
      console.error("No image selected");
      return;
    }
    const formData = new FormData();
    formData.append("image", image);

    console.log(commerceToken)

    const response = await fetch(`http://localhost:3000/api/webCommerce/upload/${cif}`, {
      method: "PATCH",
      headers: {
        "Authorization":`${commerceToken}`,
      },
      body: formData,
    });

    const data = await response.json();
    if (response.ok) {
      console.log(data);
      setImage(null); // Limpiamos la imagen seleccionada después de subirla
    } else {
      console.error(data);
    }
  };

  return (
    <form onSubmit={handleImageUpload} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Subir Imagen</h2>
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
        />
      </div>
      {image && (
        <div className="mt-4">
          <p className="text-green-500">Imagen seleccionada: {image.name}</p>
        </div>
      )}
      <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
        Subir
      </button>
    </form>
  );
};

export default UploadImage;