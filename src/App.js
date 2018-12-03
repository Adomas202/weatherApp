import React, {Component} from 'react';
import './App.css';
import Title from './components/title';
import SearchForm from './components/SearchForm';
import Card from './components/card';
import axios from "axios";

class App extends Component {
    constructor() {
        super();
        this.handleData = this.handleData.bind(this);
        this.state = {
            weather: [],
            temp: [],
            clouds: [],
            input: "",
        };
    }

    getWeather = city => {
        axios.get(`https://api.openweathermap.org/data/2.5/find?q=${city}&units=metric&appid=f92c1f4990b0574d4a4e4d3dd556f388`)
            .then(response => {
                this.setState({
                    temp: response.data.list[0].main.temp,
                });
                console.log(response.data);
            })
            .catch(error => {
                console.log('error', error);
            });
    };

    queryWeather = (cityName) => {
        this.getWeather(cityName);
    };

    handleData = data => {
        this.setState({input: data});
        this.queryWeather(data);
    };

    render() {
        return (
            <div>
                <Title/>
                <div className='content'>
                    <SearchForm handleFromParent={this.handleData}/>
                </div>
                {this.state.temp}
            </div>
        );
    }
}

export default App;
