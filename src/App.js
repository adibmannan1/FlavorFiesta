import './App.css';
import './Loader.css';
import './Header.css'
import './Search.css';
import './Favorites.css';
import './Modal.css';
import './Categories.css';
import Header from './components/Header';
import Favorites from './components/Favorites';
import Meals from './components/Meals';
import Modal from './components/Modal';
import { useGlobalContext } from './context';
import Categories from './components/Categories';

function App() {
  const {showModal} = useGlobalContext()

  return (
    <div className="App">
        <Header/>
        <div className="app-container">
          <div className="left-bar">
            <Categories/>
            <Meals/>
          </div>
          <Favorites />
        </div>
      
      {showModal && <Modal/>}
    </div>
  );
}

export default App;
