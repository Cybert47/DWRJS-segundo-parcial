import { render, screen, waitFor } from '@testing-library/react';
import { MealProvider, useMealContext } from './Context'; 
import { SearchMealByName, FetchMealByFirstLetter, FetchMealById } from './mealtService'; 
import '@testing-library/jest-dom/extend-expect';
import React from 'react';


jest.mock('./mealtService', () => ({
  SearchMealByName: jest.fn(),
  FetchMealByFirstLetter: jest.fn(),
  FetchMealById: jest.fn(),
}));


const TestComponent = () => {
  const { meal, searchMeal, fetchMealDetails, mealDetails } = useMealContext();

  return (
    <div>
      <button onClick={() => searchMeal('Chicken')}>Buscar Receta</button>
      {meal.length > 0 ? (
        meal.map((recipe) => <div key={recipe.idMeal}>{recipe.strMeal}</div>)
      ) : (
        <p>No Meal found</p>
      )}

      <button onClick={() => fetchMealDetails('12345')}>Cargar detalles de la comida</button>
      {mealDetails ? (
        <div data-testid="meal-details">{mealDetails.strMeal}</div>
      ) : (
        <p>no hay detalles de comida</p>
      )}
    </div>
  );
};

describe('MealProvider', () => {
  test('carga recetas por defecto y busca recetas', async () => {
    const mockMeal = [
      { idMeal: '123', strMeal: 'Chicken Curry' },
      { idMeal: '456', strMeal: 'Beef Stew' },
    ];


    FetchMealByFirstLetter.mockResolvedValue(mockMeal);
    SearchMealByName.mockResolvedValue([{ idMeal: '789', strMeal: 'Chicken Soup' }]);

  
    render(
      <MealProvider>
        <TestComponent />
      </MealProvider>
    );

    
    await waitFor(() => expect(screen.getByText('Chicken Curry')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Beef Stew')).toBeInTheDocument());

 
    screen.getByText('Buscar Receta').click();

    await waitFor(() => expect(screen.getByText('Chicken Soup')).toBeInTheDocument());
  });

  test('carga detalles de la comida', async () => {
    const mockMealDetails = { idMeal: '12345', strMeal: 'Chicken Alfredo' };

    FetchMealById.mockResolvedValue(mockMealDetails);

    render(
      <MealProvider>
        <TestComponent />
      </MealProvider>
    );

   
    screen.getByText('Cargar detalles de la comida').click();

    await waitFor(() => expect(screen.getByTestId('meal-details')).toHaveTextContent('Chicken Alfredo'));
  });
});
