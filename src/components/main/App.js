import React from 'react';

// component dependencies
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Grader from '../grader/Grader';

// styles
import './App.css';

function App() {
    return (
        <div className="App">
            <Header />
            <main className="App-main">
                <Grader />
            </main>
            <Footer />
        </div>
    );
}

export default App;
