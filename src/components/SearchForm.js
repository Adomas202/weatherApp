import React, { Component } from 'react';
import axios from 'axios';

class searchForm extends Component {
    getWeather() {
        let url = "http://api.openweathermap.org/data/2.5/weather?q=London&?units=metric&APPID={1d374b49fd74fc42b9e56daff44ae8fc}";
        axios
            .get(url)
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
                <button onClick={this.getWeather}>Show weather</button>
            </form>
        )
    }
}

export default searchForm;