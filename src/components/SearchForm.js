import React, {Component} from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

class searchForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            input: "",
            inputError: "",
            address: "",
        };
    }

    handleValidation = () => {
        let inputError = "";

        if (this.state.address.length === 0) {
            inputError = "The input field can't be emtpy";
            this.setState({inputError});
            return false;
        }

        if (!this.state.address.match(/^[0-9a-zA-Z]+$/)) {
            inputError = "You can't enter non alphanumeric characters";
            this.setState({inputError});
            return false;
        }

        return true;
    };

    handleSubmit = event => {
        event.preventDefault();
    };

    handleSelect = address => {
        const isValid = this.handleValidation();
        console.log(isValid);
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                console.log('Success', latLng);
                this.setState({coordinates: latLng});
                if (isValid) {
                    this.setState({inputError: ""});
                    this.props.handleFromParent(latLng);
                }
            })
            .catch(error => console.error('Error', error));
    };

    handleChange = address => {
        this.setState({address})
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <PlacesAutocomplete
                        value={this.state.address}
                        onChange={this.handleChange}
                        onSelect={this.handleSelect}
                    >
                        {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                            <div>
                                <input
                                    {...getInputProps({
                                        placeholder: 'Search for preffered location...',
                                        className: 'location-search-input',
                                    })}
                                />
                                <div className="autocomplete-dropdown-container">
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map(suggestion => {
                                        const className = suggestion.active
                                            ? 'suggestion-item--active'
                                            : 'suggestion-item';
                                        // inline style for demonstration purpose
                                        const style = suggestion.active
                                            ? {backgroundColor: '#fafafa', cursor: 'pointer'}
                                            : {backgroundColor: '#ffffff', cursor: 'pointer'};
                                        return (
                                            <div
                                                {...getSuggestionItemProps(suggestion, {
                                                    className,
                                                    style,
                                                })}
                                            >
                                                <span>{suggestion.description}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </PlacesAutocomplete>
                    <div className="input--error">
                        {this.state.inputError}
                    </div>
                </form>
            </div>
        )
    }
}

export default searchForm;