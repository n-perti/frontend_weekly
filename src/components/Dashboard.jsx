import { useState, useEffect } from "react";
import CreateWebCommerce from "./CreateWebCommerce";
import UpdateWebCommerce from "./EditWebCommerce";
import DeleteWebCommerce from "./DeleteWebCommerce";
import UploadImage from "./UploadImage";
import Modal from "./Modal";

const Dashboard = ({commerceToken, cif}) => {
  const [webCommerces, setWebCommerces] = useState([]);
  const [selectedWebCommerce, setSelectedWebCommerce] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/webCommerces/${cif}`)
      .then((response) => response.json())
      .then((data) => setWebCommerces(data));
  }, []);

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <div className="p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Dashboard</h1>
      <div className="flex space-x-4 mb-8">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={() => openModal(<CreateWebCommerce commerceToken={commerceToken} cif={cif} />)}
        >
          Create Web Commerce
        </button>
        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
          onClick={() => openModal(
            <UpdateWebCommerce
              webCommerces={webCommerces}
              selectedWebCommerce={selectedWebCommerce}
              setSelectedWebCommerce={setSelectedWebCommerce}
              setWebCommerces={setWebCommerces}
              commerceToken={commerceToken} 
              cif={cif}
            />
          )}
        >
          Edit Web Commerce
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          onClick={() => openModal(
            <DeleteWebCommerce
              selectedWebCommerce={selectedWebCommerce}
              setWebCommerces={setWebCommerces}
              commerceToken={commerceToken}
              cif={cif}
            />
          )}
        >
          Delete Web Commerce
        </button>
        {/* Nuevo botón para subir una foto */}
        <button
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
          onClick={() =>
            openModal(
              <UploadImage
                commerceToken={commerceToken}
                cif={cif}
              />
            )
          }
        >
          Subir Foto
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </div>
  );
};

export default Dashboard;