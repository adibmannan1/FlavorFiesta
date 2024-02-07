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
  
  const [showModal, setShowModal] = useState(false)
  const [selectedMeal, setSelectedMeal] = useState(null)

  const [favorites, setFavorites] = useState([])

  const fetchMeals = async (url) => {
    setLoading(true)
    try {
      const {data} = await axios.get(url)

      if(data.meals){
        setMeals(data.meals)
      }else setMeals([])
    } catch (error) {
      console.error('Error fetching data:', error.response);
    }
    setLoading(false)
  };

  //loads initial food suggestions
  useEffect(() => {
    fetchMeals(searchMealUrl);
  }, [])
  console.log(meals)

  const fetchRandomMeal = () => {
    setSearchTerm('')
    fetchMeals(randomMealUrl)
  }
  const selectMeal = (idMeal, favoriteMeal) => {
    let meal;
    if(favoriteMeal){
      meal = favorites.find(meal=> meal.idMeal === idMeal)
    }else{
      meal = meals.find(meal=> meal.idMeal === idMeal)
    }
    setSelectedMeal(meal)
    setShowModal(true)
  }
  //function to use the userinput in context.jsx
  useEffect(() => {
    if(!searchTerm) return
    fetchMeals(`${searchMealUrl}${searchTerm}`);
  }, [searchTerm])
  
  const addToFavorites = (idMeal) => {
    const alreadyFavorite = favorites.find(meal=> meal.idMeal === idMeal)
    if(alreadyFavorite) return
    const meal = meals.find(meal=> meal.idMeal === idMeal)
    const updatedFavorties = [...favorites, meal]
    setFavorites(updatedFavorties)
  }
  const removeFromFavorites = (idMeal) => {
    const updatedFavorties = favorites.filter(meal=> meal.idMeal !== idMeal)
    setFavorites(updatedFavorties)
  }

    return <AppContext.Provider value={{loading, meals, setSearchTerm, fetchRandomMeal, showModal, selectedMeal, selectMeal, setShowModal, setSelectedMeal, favorites, addToFavorites, removeFromFavorites}}>
              {children}
            </AppContext.Provider>
  };
// custom hook
const useGlobalContext = () => (useContext(AppContext))

export {AppContext, AppProvider, useGlobalContext}