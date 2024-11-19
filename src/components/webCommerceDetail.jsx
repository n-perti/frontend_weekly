import { useState, useEffect } from "react";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";

const CommerceDetail = ({ selectedCommerce, setSelectedCommerce }) => {
  const [reviews, setReviews] = useState(selectedCommerce.usersReview.review);
  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    setReviews(selectedCommerce.usersReview.review);
  }, [selectedCommerce]);

  const addReview = (newReview) => {
    setReviews([...reviews, newReview]);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-2">
        Título: {selectedCommerce.title}
      </h2>
      <p className="mb-1">Ciudad: {selectedCommerce.city}</p>
      <p className="mb-1">Actividad: {selectedCommerce.activity}</p>
      <p className="mb-4">Resumen: {selectedCommerce.summary}</p>
      <div className="mb-4">
        {selectedCommerce.text.map((paragraph, index) => (
          <p key={index} className="mb-2">
            {paragraph}
          </p>
        ))}
      </div>
      <div className="mb-4 flex flex-wrap">
        {selectedCommerce.images.map((image, index) => (
          <img
            key={index}
            className="w-48 h-auto mr-2 mb-2"
            src={"http://localhost:3000" + image}
            alt={`Imagen ${index + 1}`}
          />
        ))}
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Reseñas de Usuarios</h3>
        <p className="mb-1">Puntuación: {selectedCommerce.usersReview.scoring}</p>
        <div className="mb-1">
          {reviews.map((review) => (
            <div key={review._id} className="mb-1">
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>
      <div className="mb-4 flex space-x-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={() => setSelectedCommerce(null)}
        >
          Volver
        </button>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded"
          onClick={() => setShowReviews(!showReviews)}
        >
          {showReviews ? "Ocultar Formulario de Reseña" : "Mostrar Formulario de Reseña"}
        </button>
      </div>
      {showReviews && (
        <div className="mt-4">
          <ReviewForm commerce={selectedCommerce} addReview={addReview} />
        </div>
      )}
    </div>
  );
};

export default CommerceDetail;