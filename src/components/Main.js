import React from 'react';
import {Link} from "react-router-dom";
import DrinkPopup from '../popups/DrinkPopup'
import InfoIcon from "../img/info.png";
import SettingsIcon from "../img/settings.png";
import {dateIsToday, getAmountOfWater, Params} from "../params/Params";
import Timer from "./Timer";
import "./Main.css";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newLastWaterIntake: null,
            newAmountOfWaterPerDay: null,
            updatedData: null,
            drinkPopupIsVisible: false,
        };
        this.updateLastWaterIntake = this.updateLastWaterIntake.bind(this);
        this.changeDrinkPopupVisibility = this.changeDrinkPopupVisibility.bind(this);
    }

    updateLastWaterIntake = (updatedData) => {
        if (updatedData) {
            this.setState({updatedData: updatedData}, () => this.props.setNewStateAfterDrinking(this.state.updatedData));
            this.changeDrinkPopupVisibility();
        }
    };

    changeDrinkPopupVisibility() {
        this.setState({drinkPopupIsVisible: !this.state.drinkPopupIsVisible});
    };

    render() {
        let drinkPopup = this.state.drinkPopupIsVisible ?
            <DrinkPopup updateLastWaterIntake={this.updateLastWaterIntake}
                        state={this.props.state}
            />
            : "";

        let amountOfWaterDrinkingToday = dateIsToday(this.props.state.lastWaterIntake) && this.props.state.amountOfWaterPerDay
            ? this.props.state.amountOfWaterPerDay : 0;
        console.log(((this.props.state.weight ? this.props.state.weight : 70) * Params.WATER_PER_KILOGRAM).toFixed(1));
        return (
            <div>
                <Link to='/settings'>
                    <img src={SettingsIcon} width='25px' alt=''/>
                </Link>
                <Link to='/info'>
                    <img src={InfoIcon} width='25px' alt=''/>
                </Link>
                <br/>
                <img className='user-photo'
                     src={this.props.state.fetchedUser ? this.props.state.fetchedUser.photo_200 : 'https://bipbap.ru/wp-content/uploads/2017/12/BbC-eGVCMAAY1yv.jpg'}
                     alt=""/>
                <h2 className='addition-first'>Привет {this.props.state.fetchedUser ? this.props.state.fetchedUser.first_name : 'Username'}</h2>
                <Link to="/start">Start</Link>
                <br/>
                <button onClick={this.changeDrinkPopupVisibility}>Водички ебануть</button>
                <div className="container-bottom-blocks">
                    <div >
                        <h2>Вы выпили сегодня</h2>
                        <br/>
                        <h1>{amountOfWaterDrinkingToday}/{getAmountOfWater(this.props.state.weight)}</h1>
                    </div>
                    <div >
                        <h2>Прием воды через</h2>
                        <br/>
                        <Timer seconds={1000}/>
                    </div>
                </div>
                {drinkPopup}
            </div>
        )
    }
}

export default Main;
