import React, {Component} from 'react';
import {GoogleApiWrapper, Map, Marker} from "google-maps-react";

export class MapContainer extends Component {
    state = {userLocation: {lat: 32, lng: 32}, loading: true};

    componentDidMount(props) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const {latitude, longitude} = position.coords;

                if (this.props.lat === undefined) {
                    this.setState({
                        userLocation: {lat: latitude, lng: longitude},
                        loading: false,
                    });
                } else {
                    this.setState({
                        userLocation: {lat: this.props.lat, lng: this.props.lng},
                        loading: false,
                    })
                }
            },
            () => {
                this.setState({loading: false});
            }
        );
    }

    render() {
        const {loading, userLocation} = this.state;
        const {google} = this.props;

        if (loading) {
            return null;
        }

        return (
            <React.Fragment>
                <div className="maps--size">
                    <Map google={google} initialCenter={userLocation} zoom={16}>
                        <Marker
                            title={'Preferred location'}
                        />
                    </Map>
                </div>
            </React.Fragment>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyDGwf3wXD5z0XqaolwPbRVRKGIkDnK5ql4"
})(MapContainer);