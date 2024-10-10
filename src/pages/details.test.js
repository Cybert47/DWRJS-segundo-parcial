import { render, screen } from '@testing-library/react';
import { useMealContext } from '../services/Context';
import { useParams } from 'react-router-dom'; 
import MealDetails from './details';


jest.mock('../services/Context', () => ({
  useMealContext: jest.fn(),
}));


jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));

describe('MealDetails Component', () => {
  test('renders loading state when mealDetails is null', () => {
    useParams.mockReturnValue({ mealId: '123' }); 
    useMealContext.mockReturnValue({
      mealDetails: null,
      fetchMealDetails: jest.fn(),
    });

    render(<MealDetails />);

   
    expect(useMealContext().fetchMealDetails).toHaveBeenCalledWith('123');
    
  });

  test('renders meal details when mealDetails is available', async () => {
    useParams.mockReturnValue({ mealId: '123' });
    useMealContext.mockReturnValue({
      mealDetails: { strMeal: 'Beef', strMealThumb: 'https://example.com/beef.jpg' },
      fetchMealDetails: jest.fn(),
    });

    render(<MealDetails />);

    
    expect(await screen.findByText(/beef/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/beef.jpg'); 
  });
});
