import React from 'react';
import { Link } from 'react-router-dom';
import { useMealContext } from '../services/Context';

function Home() {
  const { meal } = useMealContext();

  return (
    <div>
      <div className="recipe-container">
        {meal.length > 0 ? (
          meal.map((meal) => (
            <div key={meal.idMeal} className="meal-card">
             
              <Link to={`/details/${meal.idMeal}`}>
                <img src={meal.strMealThumb} alt={meal.strMeal} />
              </Link>
            </div>
          ))
        ) : (
          <p>no se encontraron comidas.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
