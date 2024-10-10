import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/home";

import { MealProvider } from "./services/Context";
import MealDetails from "./pages/details";

function App() {
  return (
    <MealProvider>
      <Router>
        <div className="App">
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details/:mealId" element={<MealDetails />} />
          </Routes>
        </div>
      </Router>
    </MealProvider>
  );
}

export default App;
