import { useState, useEffect } from 'react';

const Filters = ({ commerce, setFilteredCommerce }) => {
  const [city, setCity] = useState('');
  const [activity, setActivity] = useState('');

  const uniqueCities = [...new Set(commerce.map((item) => item.city))];
  const uniqueActivities = [...new Set(commerce.map((item) => item.activity))];

  useEffect(() => {
    const filtered = commerce.filter((item) => {
      return (
        (city === '' || item.city === city) &&
        (activity === '' || item.activity === activity)
      );
    });
    setFilteredCommerce(filtered);
  }, [commerce, city, activity, setFilteredCommerce]);
  
  return (
    <div className="p-2">
      <label className="block mb-1">
        Ciudad:
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="block w-full mt-1 p-1 border border-gray-300 rounded-md text-sm"
        >
          <option value="">Todas</option>
          {uniqueCities.map((cityOption, index) => (
            <option key={index} value={cityOption}>
              {cityOption}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label className="block mb-1">
        Actividad:
        <select
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          className="block w-full mt-1 p-1 border border-gray-300 rounded-md text-sm"
        >
          <option value="">Todas</option>
          {uniqueActivities.map((activityOption, index) => (
            <option key={index} value={activityOption}>
              {activityOption}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default Filters;