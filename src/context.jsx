import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios';


// context
const AppContext = React.createContext();
const searchMealUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=' //search meals Arrabiata
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php' //random meal generator
//                     https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood
//                     https://www.themealdb.com/api/json/v1/1/list.php?c=list

// provider component
const AppProvider = ({ children }) => {
  const [meals, setMeals] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const fetchMeals = async (url) => {
    setLoading(true)
    try {
      const {data} = await axios.get(url)

      if(data.meals){
        setMeals(data.meals)
      }else setMeals([])

      console.log(data.meals)
    } catch (error) {
      console.error('Error fetching data:', error.response);
    }
    setLoading(false)
  };

  //loads initial food suggestions
  useEffect(() => {
    fetchMeals(searchMealUrl);
  }, [])

  //function to use the userinput in context.jsx
  useEffect(() => {
    const searchUrl = `${searchMealUrl}${searchTerm}`;
    fetchMeals(searchUrl);
  }, [searchTerm])


    return <AppContext.Provider value={{loading, meals, setSearchTerm}}>
              {children}
            </AppContext.Provider>
  };
// custom hook
const useGlobalContext = () => (useContext(AppContext))

export {AppContext, AppProvider, useGlobalContext}