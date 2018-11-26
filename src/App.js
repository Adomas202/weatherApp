import React, {Component} from 'react';
import './App.css';
import Title from './components/title';
import Navbar from './components/Navbar';
import SearchForm from './components/SearchForm';
import Card from './components/card';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Title/>
                <Navbar/>
                <SearchForm/>
                <Card/>
            </div>
        );
    }
}

export default App;
