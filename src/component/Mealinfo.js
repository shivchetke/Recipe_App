import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Mealinfo = () => {
  const { mealid } = useParams();
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getInfo = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`);
        const data = await response.json();
        if (data.meals && data.meals.length > 0) {
          setInfo(data.meals[0]);
        } else {
          setInfo(null);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching meal info:", error);
        setLoading(false);
      }
    };

    getInfo();
  }, [mealid]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!info) {
    return <h2>Meal not found</h2>;
  }

  return (
    <div className="mealInfo">
      <img src={info.strMealThumb} alt={info.strMeal} />
      <div className="info">
        <h1>Recipe Detail's</h1>
        <button type="button" id="mealButton">{info.strMeal}</button>
        <h3>Instructions:</h3>
        <p>{info.strInstructions}</p>
      </div>
    </div>
  );
};

export default Mealinfo;

