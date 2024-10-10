import { createContext, useContext, useState, useEffect } from "react"; 
import { FetchMealByFirstLetter, SearchMealByName, FetchMealById } from "./mealtService";

const MealContext = createContext(); 

export const MealProvider = ({ children }) => { 
    const [meal, setMeal] = useState([]); 
    const [mealDetails, setMealDetails] = useState(null);

    const searchMeal = async (name) => { 
        const results = await SearchMealByName(name);
        if (results) {
            setMeal(results);
        } else {
            setMeal([]);
        }
    };

    const loadMeal = async () => {
        const results = await FetchMealByFirstLetter(); 
        if (results) {
            setMeal(results);
        }
    };

    const fetchMealDetails = async (id) => {
        const meal = await FetchMealById(id); 
        if (meal) {
            setMealDetails(meal);
        } else {
            setMealDetails(null);
        }
    };

    useEffect(() => { 
        loadMeal();
    }, []);

    return (
        <MealContext.Provider 
            value={{ 
                meal, 
                searchMeal, 
                loadMeal, 
                mealDetails, 
                fetchMealDetails 
            }}
        > 
            {children}
        </MealContext.Provider>
    );
}

export const useMealContext = () => {
    return useContext(MealContext); 
};
