import React from "react";

import logo from "../assets/img/logo.png";
import Button from "../common/Button";
import Image from "../common/Image";
import SearchAddress from "../components/SearchAddress";
import ShipNow from "../common/ShipNow";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.closeShipNow = React.createRef();
        this.state = {
            textButton: "Giao ngay",
            open: false,
            timeOrder: false,
        };
    }

    handleOnOffShipNow = () => {
        this.setState({
            open: !this.state.open,
        });
    };
    handleTimer = () => {
        let date = document.getElementById("date").value;
        let time = document.getElementById("time").value;

        if (time !== "Trong 15-30 phút") {
            this.setState({
                textButton: date.concat(`-${time}`),
            });
        } else {
            this.setState({
                textButton: "Giao ngay",
                timeOrder: false,
            });
        }
    };

    handleShipNow = () => {
        this.setState({
            textButton: "Giao ngay",
            open: false,
            timeOrder: false,
        });
    };

    handleTimeOrder = () => {
        this.setState({
            timeOrder: true,
        });
    };

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (!this.closeShipNow.current.contains(event.target)) {
            this.setState({
                open: false,
            });
        }
    };

    render() {
        const { open, textButton, timeOrder } = this.state;
        return (
            <header className="header">
                <div className="header-container">
                    <div className="header-left">
                        <a href="/#">
                            <Image
                                className="header-left__img"
                                src={logo}
                                alt="logo the coffee fouse"
                                width="200"
                            />
                        </a>
                    </div>
                    <div className="header-center">
                        <div
                            className="header-center__call"
                            ref={this.closeShipNow}
                        >
                            <Button
                                onClick={this.handleOnOffShipNow}
                                text={textButton}
                            />
                            <ShipNow
                                open={open}
                                handleTimer={this.handleTimer}
                                handleShipNow={this.handleShipNow}
                                handleTimeOrder={this.handleTimeOrder}
                                timeOrder={timeOrder}
                            />
                        </div>

                        <div className="header-center__form">
                            <SearchAddress />
                        </div>
                    </div>
                    <div className="header-right">
                        <Button text="Đăng nhập" />
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
