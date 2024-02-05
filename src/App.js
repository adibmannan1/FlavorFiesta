import './App.css';
import './Loader.css';
import './Header.css'
import './Search.css';
import './Favorites.css';
import Header from './components/Header';
import Search from './components/Search';
import Favorites from './components/Favorites';
import Meals from './components/Meals';
import Modal from './components/Modal';

function App() {
  return (
    <div className="App">
        <Header/>
        <div class="app-container">
          <Meals/>
          <Favorites/>
        </div>
      
      {/* <Modal/> */}
    </div>
  );
}

export default App;
