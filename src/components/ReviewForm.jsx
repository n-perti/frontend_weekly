import { useState } from "react";

const ReviewForm = ({ commerce, addReview }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [cif, setCif] = useState(commerce.commerceCIF);

  async function handleReview(event) {
    event.preventDefault();
    const response = await fetch(`http://localhost:3000/api/webcommerces/review/${cif}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        rating,
        review,
      }),
    });
    const data = await response.json();
    addReview(data); // Llama a la función para actualizar las reseñas
    setRating(0);
    setReview("");
    window.location.reload();
  }

return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-2">Deja tu Reseña</h3>
        <form onSubmit={handleReview} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Rating</label>
                <input 
                    type="number" 
                    value={rating} 
                    onChange={(e) => setRating(e.target.value)} 
                    min="1" 
                    max="5" 
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Review</label>
                <input 
                    type="text" 
                    value={review} 
                    onChange={(e) => setReview(e.target.value)} 
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Submit
                </button>
            </div>
        </form>
    </div>
);
};

export default ReviewForm;