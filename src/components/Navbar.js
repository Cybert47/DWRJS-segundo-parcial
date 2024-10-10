import React, { useState } from 'react';
import "../App.css"
import { useMealContext } from '../services/Context';
import { ReactComponent as HomeIcon } from '../assets/house.svg';
import { ReactComponent as SearchIcon } from '../assets/search.svg';

const Navbar = () => {

        const [searchTerm, setSearchTerm] = useState('');
        const {searchMeal } = useMealContext();

        const handleSearch = (e) => {
          const value = e.target.value;
          setSearchTerm(value); 
          searchMeal(value); 
        }
        return (
            <nav>
                <a href="/">
                <HomeIcon   role="img"  width={24} height={24} /> 
                </a>
                <div className="search">
                    <span className="search-icon">
                        <SearchIcon role="img" width={24} height={24} />
                    </span>
                    <input type="text" placeholder="Search for a meal..."   value={searchTerm} onChange={handleSearch} />
                </div>
            </nav>
        )
    }

    export default Navbar