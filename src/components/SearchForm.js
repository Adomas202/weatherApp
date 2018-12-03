import React, {Component} from 'react';

class searchForm extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            input: "",
        };
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.handleFromParent(this.state.input);
    };

    handleChange = input => {
        this.setState({input: input.target.value})
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type='text' placeholder='Enter City Name...' onKeyDown={this.handleChange}/>
            </form>
        )
    }
}

export default searchForm;