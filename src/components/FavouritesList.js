import React, {Component} from 'react';

class FavouritesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: this.props.list,
            getFromState: false
        };
    }

    componentDidUpdate() {
        // this.setState({list: JSON.parse(localStorage.getItem('place'))})
    }

    deleteItem(id) {
        alert(id);
        const list = JSON.parse(localStorage.getItem('place'));
        list.splice(id, 1);
        console.log(list);
        const listItems = localStorage.setItem('place', JSON.stringify(list));
        this.setState({list: listItems, getFromState: true});
    }

    render() {
        if (this.state.getFromState == false) {
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