
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import { useMealContext } from '../services/Context'; 

const MealDetails = () => {
  const { mealId } = useParams(); 
  const { mealDetails, fetchMealDetails } = useMealContext();

  useEffect(() => {
    if (mealId) {
      fetchMealDetails(mealId); 
    }
  }, [mealId, fetchMealDetails]); 

  if (!mealDetails) {
    return <p>Cargando comidas...</p>;
  }

  return (
    <div className="details-container">
      <h2>{mealDetails.strMeal}</h2>
      <div className="details">

        <img src={mealDetails.strMealThumb} alt={mealDetails.name} />
        <p>{mealDetails.strInstructions}</p>
      </div>

    </div>
  );
};

export default MealDetails;
