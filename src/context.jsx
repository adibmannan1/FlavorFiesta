import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios';


// context
const AppContext = React.createContext();
const searchMealUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=' //search meals Arrabiata
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php' //random meal generator

// provider component
const AppProvider = ({ children }) => {
  const [meals, setMeals] = useState([])
  const fetchMeals = async (url) => {
    try {
      const {data} = await axios.get(url);
      setMeals(data.meals)
      console.log(data.meals)
    } catch (error) {
      console.error('Error fetching data:', error.response);
    }
  };
  useEffect(() => {
    fetchMeals(searchMealUrl);
  }, [])
    return <AppContext.Provider value={{meals}}>
              {children}
            </AppContext.Provider>
  };
// custom hook
const useGlobalContext = () => (useContext(AppContext))

export {AppContext, AppProvider, useGlobalContext}