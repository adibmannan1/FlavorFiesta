import React from 'react'
import Search from './Search'

const Header = () => {
  return (
    <div className='header'>
        <Search/>
        <button onClick='' className='btn-surprise'>
            Surprise Me
        </button>
    </div>
  )
}

export default Header