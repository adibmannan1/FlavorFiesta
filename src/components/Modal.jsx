import React from 'react'
import { useGlobalContext } from '../context'

const Modal = () => {
  const {selectedMeal, setShowModal, setSelectedMeal} = useGlobalContext()
  const {strMeal, strInstructions, strSource, strMealThumb} = selectedMeal
  const lines = strInstructions.split('\n');
  return (
    <aside className='modal-overlay'>
      <div className='modal-container'>
        <img src={strMealThumb} alt={strMeal} />
        <main>
          <header>
            <h1>{strMeal}</h1>
            <button className='close-btn' onClick={()=>{
              setShowModal(false)
              setSelectedMeal(null)
              }}>
            <svg xmlns="http://www.w3.org/2000/svg" height="28" width="28" viewBox="0 0 512 512"><path fill="#fe0b0b" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>
            </button>
          </header>
          <h3>Recipe: </h3>
          <div className='recipe'>
            {lines.map((line, index) => (
              <p key={index} style={{ marginBottom: '10px' }}>{line}</p>
            ))}
          </div>
          <a href={strSource} target='_blank' rel="noreferrer">Source</a>
        </main>
      </div>
    </aside>
  )
}

export default Modal