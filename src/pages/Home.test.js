import { render, screen } from '@testing-library/react';
import { useMealContext } from '../services/Context'; 
import Home from './home';


jest.mock('../services/Context', () => ({
  useMealContext: jest.fn(),
}));

describe('Home Component', () => {
  test('renders "No se encontraron recetas." when there are no meal', () => {
    useMealContext.mockReturnValue({ meal: [] });

    render(<Home />);

    expect(screen.getByText(/no se encontraron recetas/i)).toBeInTheDocument();
  });

  test('renders meal when they are available', () => {
    const mockMeal = [
      { idMeal: '1', strMeal: 'Beef', strMealThumb: 'https://example.com/pizza.jpg' },
      { idMeal: '2', strMeal: 'Beef', strMealThumb: 'https://example.com/pasta.jpg' },
    ];

    useMealContext.mockReturnValue({ meal: mockMeal });

    render(<Home />);

    expect(screen.getByText(/beef/i)).toBeInTheDocument();
    expect(screen.getByText(/beef/i)).toBeInTheDocument();
  });
});
