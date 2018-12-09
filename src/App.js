import React, {Component} from 'react';
import './App.css';
import './components/styles.scss';
import Title from './components/title';
import SearchForm from './components/SearchForm';
import Card from './components/card';
import MapContainer from './components/MapContainer';
import axios from "axios";
import Geocode from "react-geocode";

class App extends Component {
    constructor() {
        super();
        this.handleData = this.handleData.bind(this);
        this.state = {
            weather: {},
            temp: "",
            clouds: [],
            input: "",
            inputSubmit: false,
            userCoordinatesLat: "",
            userCoordinatesLon: "",
            address: ""
        };
    }

    componentDidMount(props) {
            Geocode.setApiKey("AIzaSyDGwf3wXD5z0XqaolwPbRVRKGIkDnK5ql4");
            navigator.geolocation.getCurrentPosition(
                position => {
                    const {latitude, longitude} = position.coords;
                    this.getWeather(latitude, longitude);

                    this.setState({
                        location: {lat: latitude, lng: longitude},
                    });
                    // Get reverse geocode to find user address
                    Geocode.fromLatLng(latitude, longitude).then(
                        response => {
                            const address = response.results[0].formatted_address;
                            this.setState({address: address});
                            console.log(address);
                        },
                        error => {
                            console.error(error);
                        }
                    );
                }
            );
            if (this.state.input != "") {
                this.setState({location: this.state.input});
            }
    }

    getWeather = (lat, lng) => {
        axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lng}&units=metric&appid=f92c1f4990b0574d4a4e4d3dd556f388`)
            .then(response => {
                this.setState({
                    temp: response.data.list[0].temp.day,
                    weather: response.data,
                });
            })
            .catch(error => console.log('error', error))
        ;
    };

    queryWeather = (coordinates) => {
        this.getWeather(coordinates.lat, coordinates.lng);
    };

    handleData = (coordinates, address) => {
        this.setState({
            input: coordinates,
            address: address,
            inputSubmit: true
        });
        this.queryWeather(coordinates);
        this.setState({location: coordinates})
    };

    render() {
        if (this.state.temp === "") {
            return (
                <div className="container">
                    <Title/>
                    <div className='content'>
                        <SearchForm handleFromParent={this.handleData}/>
                    </div>
                </div>
            )
        }

        return (
            <div>
                <Title/>
                <div className='content'>
                    <SearchForm handleFromParent={this.handleData}/>
                </div>
                <Card
                    location={this.state.address}
                    weather={this.state.weather}
                />
                {console.log("kordinate" + this.state.userCoordinatesLat)}
                <div className="maps--size">
                    <MapContainer location={this.state.location}
                    />
                </div>
            </div>
        );
    }
}

export default App;
