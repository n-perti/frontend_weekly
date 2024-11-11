import { useCallback, useEffect, useState } from "react";

const CommerceDetail = () => {
  const [commerce, setCommerce] = useState([]);
  const [selectedCommerce, setSelectedCommerce] = useState(null);
  const [city, setCity] = useState(null);
  const [activity, setActivity] = useState(null);
  const [filteredCommerce, setFilteredCommerce] = useState([]);

  const uniqueCities = [...new Set(commerce.map((item) => item.city))];
  const uniqueActivities = [...new Set(commerce.map((item) => item.activity))];

  useEffect(() => {
    fetch("http://localhost:3000/api/webcommerces/all")
      .then((response) => response.json())
      .then((data) => {
        setCommerce(data);
        setFilteredCommerce(data);
      });
  }, []);

  useEffect(() => {
    const filtered = commerce.filter((item) => {
      return (
        (city === "" || item.city === city) &&
        (activity === "" || item.activity === activity)
      );
    });
  });

  const handleCommerceClick = (commerce) => {
    setSelectedCommerce(commerce);
  };

  const handleSortByRatingAsc = () => {
    const sorted = [...filteredCommerce].sort((a, b) => a.rating - b.rating);
    setFilteredCommerce(sorted);
  };

  const handleSortByRatingDesc = () => {
    const sorted = [...filteredCommerce].sort((a, b) => b.rating - a.rating);
    setFilteredCommerce(sorted);
  };

  return (
    <div>
      <h1>Commerce Detail</h1>
      {selectedCommerce ? (
        <div>
          <h2>Title: {selectedCommerce.title}</h2>
          <p>City: {selectedCommerce.city}</p>
          <p>Activity: {selectedCommerce.activity}</p>
          <p>Summary: {selectedCommerce.summary}</p>
          <div>
            {selectedCommerce.text.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <div>
                        {selectedCommerce.images.map((image, index) => (
                            <img key={index} style={{ width: '200px', height: 'auto' }} src={'http://localhost:3000'+ image} alt={`Commerce image ${index + 1}`} />
                        ))}
                    </div>
          <div>
            <h3>User Reviews</h3>
            <p>Scoring: {selectedCommerce.usersReview.scoring}</p>
            <p>Total Reviews: {selectedCommerce.usersReview.totalReviews}</p>
            <p>Review: {selectedCommerce.usersReview.review}</p>
          </div>
          <button onClick={() => setSelectedCommerce(null)}>Back</button>
        </div>
      ) : (
        <div>
          <div>
            <label>
              City:
              <select value={city} onChange={(e) => setCity(e.targer.value)}>
                <option value="">All</option>
                {uniqueCities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <label>
              Activity:
              <select
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
              >
                <option value="">All</option>
                {uniqueActivities.map((activity, index) => (
                  <option key={index} value={activity}>
                    {activity}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <button onClick={handleSortByRatingAsc}> Order by ↑</button>
            <span style={{ margin: "0 10px" }}></span>
            <button onClick={handleSortByRatingDesc}> Order by ↓</button>
          </div>
          <ul>
            {filteredCommerce.map((item) => (
              <li key={item._id} onClick={() => handleCommerceClick(item)}>
                <h3>
                  {item.title} – {item.city} – {item.activity}
                </h3>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CommerceDetail;
