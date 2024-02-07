import React from 'react'
import { useGlobalContext } from '../context'

const Favorites = () => {
  const {favorites, selectMeal, removeFromFavorites} = useGlobalContext()

  return (
    <div className='favorites'>
      <h2 className='favorite-title'>Favorites</h2>
      {
        favorites.map(favorite=>{
          console.log(favorite)
          return(
          <div key={favorite.idMeal} className='favorite-container'>
            <img src={favorite.strMealThumb} alt={favorite.strMeal} onClick={()=>selectMeal(favorite.idMeal, true)}/>
            <div className="favorite-content">
              <div className="favorite-text">
                <h4>{favorite.strMeal}</h4>
                <p>{favorite.strCategory}</p>
              </div>
              <button onClick={()=>removeFromFavorites(favorite.idMeal)}>Remove</button>
            </div>
          </div>
          )})
      }
    </div>
  )
}

export default Favorites