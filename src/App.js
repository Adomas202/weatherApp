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
            address: "",
            newItem: "",
            list: []
        };
    }

    componentDidMount(props) {
        Geocode.setApiKey("AIzaSyBMuGcz5CxAxs3o7zF56CyQX2NcshLMChg");
        navigator.geolocation.getCurrentPosition(
            position => {
                const {latitude, longitude} = position.coords;
                this.getWeather(latitude, longitude);

                this.setState({
                    location: {lat: latitude, lng: longitude},
                });
                // Get reverse geocode to find user address
                Geocode.fromLatLng(latitude, longitude)
                    .then(response => {
                            const address = response.results[0].formatted_address;
                            this.setState({address: address});
                        },
                        error => {
                            console.error(error);
                        }
                    );
            }
        );
    }

    getWeather = (lat, lng) => {
        axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lng}&cnt=5&units=metric&appid=f92c1f4990b0574d4a4e4d3dd556f388`)
            .then(response => {
                this.setState({
                    temp: response.data.list[0].temp.day,
                    weather: response.data,
                });
            })
            .catch(error => console.log(error))
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

    addItem() {
        if (localStorage.getItem('place') == null) {
            const list = [];
            list.push(this.state.address);
            localStorage.setItem('place', JSON.stringify(list));
        } else {
            const list = JSON.parse(localStorage.getItem('place'));
            list.push(this.state.address);
            localStorage.setItem('place', JSON.stringify(list));
        }
        this.setState({list: JSON.parse(localStorage.getItem('place'))});
    }

    deleteItem(id) {
        const list = JSON.parse(localStorage.getItem('place'));
        list.splice(id, 1);
        localStorage.setItem('place', JSON.stringify(list));
        this.setState({list: JSON.parse(localStorage.getItem('place'))});
    }

    render() {
        if (this.state.temp === "") {
            return (
                <div className="wrapper container">
                    <Title/>
                    <div className="content">
                        <SearchForm handleFromParent={this.handleData}/>
                        Getting current location...
                    </div>
                </div>
            )
        }

        return (
            <div>
                <div className="wrapper container">
                    <Title/>
                    <div className="content">
                        <SearchForm handleFromParent={this.handleData}/>
                        <button onClick={() => this.addItem()}>
                            Add location to Favourites list
                        </button>
                    </div>
                </div>
                <Card
                    location={this.state.address}
                    weather={this.state.weather}
                />
                {this.state.list.map((item, index) => {
                    return (
                        <li key={index}>
                            {item}
                            <button onClick={() => this.deleteItem(index)}>
                                Remove
                            </button>
                        </li>
                    );
                })}
                <div className="maps--size">
                    <MapContainer location={this.state.location}
                    />
                </div>
            </div>
        );
    }
}

export default App;
