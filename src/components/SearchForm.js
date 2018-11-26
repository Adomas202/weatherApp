import React, { Component } from 'react';
import axios from 'axios';

class searchForm extends Component {
    getWeather() {
        axios
            .get(`https://api.openweathermap.org/data/2.5/find?q=Vilnius&units=imperial&appid=f92c1f4990b0574d4a4e4d3dd556f388`)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        return(
            <form>
                <input type="text" name="city" placeholder="City"/>
                <input type="text" name="country" placeholder="Country"/>
                <button onClick={this.getWeather()}>Show weather</button>
            </form>
        )
    }
}

export default searchForm;