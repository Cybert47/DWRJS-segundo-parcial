import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from './Navbar';


const mockSearchMeal = jest.fn(); 

jest.mock('../services/Context', () => ({
  useMealContext: () => ({
    searchMeal: mockSearchMeal, 
  }),
}));

describe('Navbar Component', () => {
  test('renders correctly', () => {
    render(<Navbar />);
    
   
    const homeIcon = screen.getByRole('img'); 
    expect(homeIcon).toBeInTheDocument();


    
   
    expect(screen.getByPlaceholderText('Search for a meal...')).toBeInTheDocument();
  });

  test('updates search term and calls searchMeal on input change', async () => {
    render(<Navbar />);
    
    const searchInput = screen.getByPlaceholderText('Search for a meal...');
    
   
    fireEvent.change(searchInput, { target: { value: 'beef' } });
    

    expect(searchInput.value).toBe('beef');
    
 
    await waitFor(() => {
      expect(mockSearchMeal).toHaveBeenCalledWith('beef');
    });
  });
});
