import logo from './zaSkocka/sova.png';
import './App.css';
import Dugmad from "./komponente/dugmad";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <Dugmad />
        </div>
      </header>
    </div>
  );
}

export default App;