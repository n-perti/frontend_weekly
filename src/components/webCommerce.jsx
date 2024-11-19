import { useEffect, useState } from 'react';
import Filters from './Filters';
import CommerceDetail from './webCommerceDetail';

const Commerce = () => {
  const [commerce, setCommerce] = useState([]);
  const [selectedCommerce, setSelectedCommerce] = useState(null);
  const [filteredCommerce, setFilteredCommerce] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/webcommerces/all")
      .then((response) => response.json())
      .then((data) => {
        setCommerce(data);
        setFilteredCommerce(data);
      });
  }, []);

  const handleCommerceClick = (commerceItem) => {
    setSelectedCommerce(commerceItem);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Detalles del Comercio</h1>
      {selectedCommerce ? (
        <CommerceDetail
          selectedCommerce={selectedCommerce}
          setSelectedCommerce={setSelectedCommerce}
        />
      ) : (
        <div>
          <Filters
            commerce={commerce}
            setFilteredCommerce={setFilteredCommerce}
          />
          <ul className="space-y-4 mt-4">
            {filteredCommerce.map((item) => (
              <li
                key={item._id}
                onClick={() => handleCommerceClick(item)}
                className="cursor-pointer p-4 border rounded-lg hover:bg-gray-50 transition duration-200 ease-in-out"
              >
                <h3 className="text-lg font-semibold text-gray-700">
                  {item.title}
                </h3>
                <p className="text-gray-500">{item.description}</p>
                <div className="flex justify-between items-center mt-2">
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Commerce;