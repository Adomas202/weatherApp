import React, {Component} from 'react';

class FavouritesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: this.props.list,
            getFromState: false
        };
    }

    render() {
        if (this.state.getFromState === false) {
            return (
                <div>
                    <ul>
                        {this.props.list.map((item, index) => {
                            return (
                                <li key={index}>
                                    {item}
                                    <button onClick={() => this.deleteItem(index)}>
                                        Remove
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )
        } else {
            return (
                <div>
                    <ul>
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
                    </ul>
                </div>
            )
        }
    }
}

export default FavouritesList;