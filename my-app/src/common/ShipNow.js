import React from "react";
import "../assets/shipnow.scss";
import Button from "../common/Button";

class ShipNow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date1: "",
            date2: "",
            date3: "",
            checkDay: false,
            hoursTomorrow: [],
            hoursNow: [],
        };
    }

    componentDidMount() {
        let day = new Date();
        let nextDay = new Date(day);
        nextDay.setDate(day.getDate() + 1);
        let nextTwoDay = new Date(day);
        nextTwoDay.setDate(day.getDate() + 2);
        //giờ ngày khác
        let arr = [];
        for (let i = 7; i <= 20; i++) {
            for (let j = 0; j <= 30; j += 30) {
                if (j === 0) {
                    arr.push(i + ":00");
                } else {
                    arr.push(i + ":" + j);
                }
            }
        }

        let minutes = day.getMinutes();
        //giờ hôm nay
        let arr2 = ["Trong 15-30 phút"];
        let sum = day.getHours();
        if (sum <= 20 && sum >= 7) {
            let first = 0;
            if (minutes >= 45) {
                first = 1;
            }
            for (let i = first; i <= 20 - sum; i++) {
                if (i < 3) {
                    for (let j = 0; j <= 45; j += 15) {
                        if (j === 0) {
                            arr2.push(sum + i + ":00");
                        } else {
                            arr2.push(sum + i + ":" + j);
                        }
                    }
                } else {
                    for (let j = 0; j <= 30; j += 30) {
                        if (j === 0) {
                            arr2.push(sum + i + ":00");
                        } else {
                            arr2.push(sum + i + ":" + j);
                        }
                    }
                }
            }

            if (minutes < 15) {
                arr2.splice(1, 2);
            } else if (minutes < 30) {
                arr2.splice(1, 3);
            } else if (minutes < 45) {
                arr2.splice(1, 4);
            } else if (minutes > 45) {
                arr2.splice(1, 1);
            }
        }

        this.setState({
            date1: day.toLocaleDateString("en-GB"),
            date2: nextDay.toLocaleDateString("en-GB"),
            date3: nextTwoDay.toLocaleDateString("en-GB"),
            hoursTomorrow: arr,
            hoursNow: arr2,
        });
    }
    hanldeChange = (e) => {
        if (e.target.value !== this.state.date1) {
            this.setState({
                checkDay: true,
            });
        } else {
            this.setState({
                checkDay: false,
            });
        }
    };
    render() {
        const { open, timeOrder } = this.props;
        const { hoursNow, hoursTomorrow, date1, date2, date3, checkDay } =
            this.state;

        return (
            <div className={open ? "open ship-now" : "ship-now"}>
                <div className="ship-now__top">
                    <div
                        className="ship-now__top-text"
                        onClick={this.props.handleShipNow}
                    >
                        <i className="fa fa-search"></i>
                        <span>Giao ngay</span>
                    </div>
                    <div
                        className="ship-now__top-text"
                        onClick={this.props.handleTimeOrder}
                    >
                        <i className="fa fa-search"></i>
                        <span>Thời gian đặt hàng</span>
                    </div>
                </div>
                <div
                    className={
                        timeOrder ? "open ship-now__bot" : "ship-now__bot"
                    }
                >
                    <div className="ship-now__bot-day">
                        <label>Ngày đặt</label>
                        <select id="date" onChange={this.hanldeChange}>
                            <option value={date1}>Hôm nay</option>
                            <option value={date2}>{date2}</option>
                            <option value={date3}>{date3}</option>
                        </select>
                    </div>
                    <div className="ship-now__bot-day">
                        <label>Thời gian đặt</label>
                        <select id="time">
                            {checkDay
                                ? hoursTomorrow.map((item, index) => (
                                      <option key={index} value={item}>
                                          {item}
                                      </option>
                                  ))
                                : hoursNow.map((item, index) => (
                                      <option key={index} value={item}>
                                          {item}
                                      </option>
                                  ))}
                        </select>
                    </div>
                    <Button
                        onClick={this.props.handleTimer}
                        className="btn-shipnow"
                        text="Hẹn giờ"
                    />
                </div>
            </div>
        );
    }
}

export default ShipNow;
