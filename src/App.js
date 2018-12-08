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
            weather: {},
            temp: "",
            clouds: [],
            input: "",
        };
    }

    getWeather = (lat, lng) => {
        console.log(lat, lng);
        axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lng}&units=metric&appid=f92c1f4990b0574d4a4e4d3dd556f388`)
            .then(response => {
                this.setState({
                    temp: response.data.list[0].temp.day,
                    weather: response.data,
                });
                console.log(response.data.list);
            })
            .catch(error => {
                console.log('error', error);
            });
    };

    queryWeather = (coordinates) => {
        this.getWeather(coordinates.lat, coordinates.lng);
    };

    handleData = data => {
        this.setState({input: data});
        this.queryWeather(data);
    };

    render() {
        if (this.state.temp === "") {
            return (
                <div>
                    <Title/>
                    <SearchForm handleFromParent={this.handleData}/>
                </div>
            )
        }

        return (
            <div>
                <Title/>
                <div className='content'>
                    <SearchForm handleFromParent={this.handleData}/>
                </div>
                {this.state.weather.list.map(day => {
                    return(<div>{day.temp.day}</div>)
                })}
                {/*{this.state.weather.list.map(day => {*/}
                {/*return(*/}
                {/*<div>*/}
                {/*{day.temp.day}*/}
                {/*</div>*/}
                {/*)*/}
                {/*})}*/}
            </div>
        );
    }
}

export default App;
