import React, {Component} from 'react';
import MapApiKey from '../MapApiKey';
import {GoogleApiWrapper, Map, Marker} from "google-maps-react";

export class MapContainer extends Component {

    render() {
        if (this.props.location === undefined) {
            return <div>Loading...</div>;
        }
        const {google} = this.props;

        return (
            <React.Fragment>
                <div className="maps--size">
                    <Map
                        className="maps--size"
                        google={google}
                        center={this.props.location}
                        initialCenter={this.props.location}
                        zoom={16}>
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
    apiKey: MapApiKey
})(MapContainer);