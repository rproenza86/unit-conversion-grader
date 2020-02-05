import React from 'react';

// component dependencies
import Header from '../header/Header';
import Footer from '../footer/Footer';

// assets
import logo from './logo.svg';

// styles
import './App.css';

function App() {
    return (
        <div className="App">
            <Header />
            <main className="App-main">
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
            </main>
            <Footer />
        </div>
    );
}

export default App;
