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
            legitAddress: true,
            loading: true,
            showError: false
        };
    }

    handleValidation = () => {
        let inputError = "";

        if (this.state.legitAddress)
            if (this.state.address.length === 0) {
                inputError = "The input field can't be emtpy";
                this.setState({
                    inputError,
                    showError: true
                });
                return false;
            }

        if (!this.state.address.match(/^[0-9a-zA-Z]+$/)) {
            inputError = "You can't enter non alphanumeric characters";
            this.setState({
                inputError,
                showError: true
            });
            return false;
        }

        return true;
    };

    handleSubmit = event => {
        event.preventDefault();
    };

    handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                this.setState({coordinates: latLng});
                this.setState({
                    inputError: "",
                    address: address,
                    loading: false,
                });
                this.props.handleFromParent(latLng, address);
            })
            .catch(error => {
                console.error('Error', error);
                const valid = this.handleValidation();
                if (valid) {
                    alert("Address not found!");
                }
            });
    };

    handleChange = address => {
        this.setState({address});
        if (address.length === 0) {
            this.setState({showError: false});
        }
    };

    render() {
        return (
            <div>
                Search for preferred location
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
                                        type: 'text',
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
                </form>
                {this.state.showError ? (
                    <div className="input--error">
                        {this.state.inputError}
                    </div>
                ) : null}
            </div>
        )
    }
}

export default searchForm;