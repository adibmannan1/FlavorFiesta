import './App.css';
import './Loader.css';
import './Header.css'
import './Search.css';
import './Favorites.css';
import './Modal.css';
import Header from './components/Header';
import Favorites from './components/Favorites';
import Meals from './components/Meals';
import Modal from './components/Modal';
import { useGlobalContext } from './context';

function App() {
  const {showModal, favorites} = useGlobalContext()

  return (
    <div className="App">
        <Header/>
        <div className="app-container">
          <Meals/>
          {favorites.length>0? <Favorites/> : <p>You have no Favorite recipes yet. 😊</p>}
        </div>
      
      {showModal && <Modal/>}
    </div>
  );
}

export default App;
