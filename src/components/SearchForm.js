import React, {Component} from 'react';

class searchForm extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            input: "",
            inputError: "",
        };
    }

    handleValidation = () => {
        let inputError = "";

        if (this.state.input.length === 0) {
            inputError = "The input field can't be emtpy";
            this.setState({inputError});
            return false;
        }

        if (!this.state.input.match(/^[0-9a-zA-Z]+$/)) {
            inputError = "You can't enter non alphanumeric characters";
            this.setState({inputError});
            return false;
        }

        return true;
    };

    handleSubmit = event => {
        event.preventDefault();
        const isValid = this.handleValidation();
        if (isValid) {
            this.props.handleFromParent(this.state.input);
        }
    };

    handleChange = input => {
        this.setState({input: input.target.value})
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type='text' placeholder='Enter City Name...' onKeyDown={this.handleChange}/>
                <div className="input--error">
                    {this.state.inputError}
                </div>
            </form>
        )
    }
}

export default searchForm;