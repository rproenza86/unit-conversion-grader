import React from 'react';

// component dependencies
import Header from '../header/Header';

// assets
import logo from './logo.svg';

// styles
import './App.css';

function App() {
    return (
        <div className="App">
            <Header />
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>Code change to test CI/CD workflow</p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
