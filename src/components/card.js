import React from 'react';
import './styles.scss';

const Card = () => {
    return (
        <div className="card">
            <span className="location">Vilnius, Lithuania</span>
            <ul className="menu">
                <li></li>
                <li></li>
                <li></li>
            </ul>
            {/*<br>*/}
            <span className="temp">76&#176;</span>
        </div>
    )
};

export default Card;