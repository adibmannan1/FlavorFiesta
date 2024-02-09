import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios';


// context
const AppContext = React.createContext();
const searchMealUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=' //search meals
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php' //random meal generator

// provider component
const AppProvider = ({ children }) => {
  const [meals, setMeals] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [selectedMeal, setSelectedMeal] = useState(null)
  const [categories, setCategories] = useState([]);

  const [favorites, setFavorites] = useState(() => {
    // Load favorites from local storage on component mount
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

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
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
      if (data.categories) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error.response);
    }
  };
  

  //loads initial food suggestions
  useEffect(() => {
    fetchMeals(searchMealUrl);
  }, [])

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
    const updatedFavorites = [...favorites, meal]
    setFavorites(updatedFavorites)
    // Save favorites to local storage
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  }
  const removeFromFavorites = (idMeal) => {
    const updatedFavorites = favorites.filter(meal=> meal.idMeal !== idMeal)
    setFavorites(updatedFavorites)
    // Save updated favorites to local storage
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  }

  const filterByCategory = async (category) => {
    setSearchTerm('');
    const categoryUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;

    fetchMeals(categoryUrl);
  }

  

  useEffect(() => {
    fetchCategories();
  }, []);

    return <AppContext.Provider value={{loading, meals, setSearchTerm, fetchRandomMeal, showModal, selectedMeal, selectMeal, setShowModal, setSelectedMeal, favorites, addToFavorites, removeFromFavorites, categories, filterByCategory,}}>
              {children}
            </AppContext.Provider>
  };
// custom hook
const useGlobalContext = () => (useContext(AppContext))

export {AppContext, AppProvider, useGlobalContext}