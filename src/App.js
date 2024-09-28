import React from 'react';
import logo1 from './mundo.png';
import logo2 from './isaapa.png';
import TodoList from './Components/TodoList/TodoList';
import Footer from './Components/Footer/Footer';
import './App.css'; 

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <img src={logo1} alt="Logo" className="app-logo" />
        <img src={logo2} alt="Logo" className="app-logo" />
      </header>
      <TodoList />
      <Footer />
    </div>
  );
}

export default App;