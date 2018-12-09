import React from 'react';
import './styles.scss';

const Card = (props) => {
    return (
        <div>
            <div className="card">
                <span className="city">{props.location}</span>
                <ul className="menu">
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
                <br/>
                <div className="sun"></div>
                <span className="temp">76&#176;</span>
                <span>
    <ul className="variations">
      <li>CLEAR</li>
      <li><span className="speed">9<span className="mph">mph</span></span></li>
    </ul>
  </span>
                {/*{props.weather.map(day => {*/}
                    {/*return (*/}
                        {/*<div>{day.temp.day}</div>*/}
                    {/*)*/}
                {/*})}*/}
                {console.log(props.weather)}
                <div className="forecast clear">
                    <div className="day tue">TUE
                        <br/> <span className="cloudy"></span> <br/> <span className="highTemp">79&#176;</span>
                        <br/> <span
                            className="lowTemp">57&#176;</span>
                    </div>
                    <div className="day wed">WED
                        <br/> <span className="sunny"></span> <br/> <span className="highTemp">79&#176;</span>
                        <br/> <span
                            className="lowTemp">57&#176;</span>
                    </div>
                    <div className="day thu">THU
                        <br/> <span className="sunny"></span> <br/> <span className="highTemp">79&#176;</span>
                        <br/> <span
                            className="lowTemp">57&#176;</span>
                    </div>
                    <div className="day fri">FRI
                        <br/> <span className="cloudy"></span> <br/> <span className="highTemp">79&#176;</span>
                        <br/> <span
                            className="lowTemp">57&#176;</span>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Card;