import React from 'react';
import {Link} from "react-router-dom";
import DrinkPopup from '../popups/DrinkPopup'
import InfoIcon from "../img/icon_info.svg";
import SettingsIcon from "../img/icon_settings.svg";
import {dateIsToday, getAmountOfWater, getTimeUntilTheNextWaterIntake} from "../params/Params";
import Timer from "./Timer";
import "./Main.css";
import WellDonePopup from "../popups/WellDonePopup";
import ProgressBar from "./ProgressBar";
import imgDrop from "../img/main-drop.svg";
import Plus from "../img/+.svg";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newLastWaterIntake: null,
            newAmountOfWaterPerDay: null,
            updatedData: null,
            drinkPopupIsVisible: false,
            wellDonePopupIsVisible: false,
        };
        this.updateLastWaterIntake = this.updateLastWaterIntake.bind(this);
        this.changeDrinkPopupVisibility = this.changeDrinkPopupVisibility.bind(this);
        this.changeWellDonePopupVisibility = this.changeWellDonePopupVisibility.bind(this);

    }

    updateLastWaterIntake = (updatedData) => {
        if (updatedData) {
            this.setState({updatedData: updatedData}, () => this.props.setNewStateAfterDrinking(this.state.updatedData));
            this.changeDrinkPopupVisibility();
            this.changeWellDonePopupVisibility();
        }
    };

    changeWellDonePopupVisibility() {
        this.setState({wellDonePopupIsVisible: !this.state.wellDonePopupIsVisible});
    };

    changeDrinkPopupVisibility() {
        this.setState({drinkPopupIsVisible: !this.state.drinkPopupIsVisible});
    };

    render() {
        let drinkPopup = this.state.drinkPopupIsVisible ?
            <DrinkPopup updateLastWaterIntake={this.updateLastWaterIntake}
                        state={this.props.state}
                        changeDrinkPopupVisibility={this.changeDrinkPopupVisibility}
            />
            : "";

        let wellDonePopup = this.state.wellDonePopupIsVisible ?
            <WellDonePopup changeWellDonePopupVisibility={this.changeWellDonePopupVisibility}/>: "";

        let amountOfWaterDrinkingToday = dateIsToday(this.props.state.lastWaterIntake) && this.props.state.amountOfWaterPerDay
            ? this.props.state.amountOfWaterPerDay : 0;

        return (
            <div className='main-body-container'>
                <Link to='/settings'>
                    <img src={SettingsIcon} className='main-image-settings' alt=''/>
                </Link>
                <Link to='/info'>
                    <img src={InfoIcon} className='main-image-info' alt=''/>
                </Link>
                <br/>
                <div>
                    <img className='main-user-photo'
                         src={this.props.state.fetchedUser ? this.props.state.fetchedUser.photo_200 : 'https://bipbap.ru/wp-content/uploads/2017/12/BbC-eGVCMAAY1yv.jpg'}
                         alt="..."/>
                    <h2 className='main-addition-first'>Привет<br/> {this.props.state.fetchedUser ? this.props.state.fetchedUser.first_name : 'Username'}</h2>
                </div>
                <div className="main-drop-wave-container">
                    <img src={imgDrop} className="main-water-drop" alt=""/>
                </div>
                {/*<Link to="/start">Start</Link>*/}
                {/*<br/>*/}
                <button className='main-button-water' onClick={this.changeDrinkPopupVisibility}><img src={Plus} className='main-image-button' alt="" /></button>
                <div className="container-bottom-blocks">
                    <div className='main-info-block-today'>
                        <h2 className='main-text-info-block-today'>Вы выпили сегодня:</h2>
                        <br/>
                        <h2 className = 'main-text-info-today-drink'> {amountOfWaterDrinkingToday}/{getAmountOfWater(this.props.state.weight)}л</h2>
                    </div>
                    <div className='main-water-block-today'>
                        <h2 className='main-text-water-block-today'>Прием воды через:</h2>
                        <Timer seconds={getTimeUntilTheNextWaterIntake(this.props.state.lastWaterIntake)}/>
                    </div>
                </div>
                <ProgressBar progress={100 * amountOfWaterDrinkingToday / getAmountOfWater(this.props.state.weight)} />
                {drinkPopup}
                {wellDonePopup}
            </div>
        )
    }
}

export default Main;
