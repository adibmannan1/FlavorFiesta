import React from 'react'
import { useGlobalContext } from '../context'

const Favorites = () => {
  const {favorites, selectMeal, removeFromFavorites} = useGlobalContext()
  return (
    <div className='favorites'>
      <h2 className='favorite-title'>Favorites</h2>
      <div className="favorite-array">
        {favorites.length > 0 ? (
          favorites.map(favorite=>(
            <div key={favorite.idMeal} className='favorite-container'>
              <img src={favorite.strMealThumb} alt={favorite.strMeal}
              onClick={()=>selectMeal(favorite.idMeal, true)}/>
              <div className="favorite-content">
                <div className="favorite-text">
                  <h4>{favorite.strMeal}</h4>
                  <p>{favorite.strCategory}</p>
                </div>
                <button onClick={()=>removeFromFavorites(favorite.idMeal)}>Remove</button>
              </div>
            </div>
            ))) : (
              <p className='favorites-p-tag'>You have no Favorite recipes yet. 😊</p>
            )
        }
      </div>
    </div>
  )
}

export default Favorites

