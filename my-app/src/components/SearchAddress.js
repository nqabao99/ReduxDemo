import React from "react";
import SearchInput from "../common/SearchInput";
import AddressItem from "../common/AddressItem";
import NoDataAddressItem from "../common/NoDataAddressItem";
import "../assets/addressitem.scss";

class SearchAddress extends React.Component {
    constructor(props) {
        super(props);
        this.closeSearchAddress = React.createRef();
        this.state = {
            dataSearch: "",
            dataAddress: [],
            close: false,
        };
    }

    handleChange = (e) => {
        this.setState({
            dataSearch: e.target.value,
        });

        if (e.target.value.length > 3) {
            fetch(
                `https://api.thecoffeehouse.com/api/v5/map/autocomplete?key=${e.target.value.toLowerCase()}&from=TCH-WEB`,
                {
                    headers: {
                        accept: "application/json, text/plain, */*",
                        "accept-language": "en-US,en;q=0.9,ja;q=0.8",
                        "cache-control": "no-cache",
                        pragma: "no-cache",
                        "sec-ch-ua":
                            '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
                        "sec-ch-ua-mobile": "?0",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-site",
                        "tch-app-version": "",
                        "tch-device-id": "",
                        "x-csrf-token":
                            "XJVEF4AnLtZqcFJ87XeJaV1nJxGC5HrAkMy9QCHA",
                        "x-requested-with": "XMLHttpRequest",
                    },
                    referrer: "https://order.thecoffeehouse.com/",
                    referrerPolicy: "strict-origin-when-cross-origin",
                    body: null,
                    method: "GET",
                    mode: "cors",
                    credentials: "omit",
                }
            )
                .then((response) => response.json())
                .then((data) => {
                    this.setState({
                        dataAddress: data.addresses,
                    });
                });
        }
    };

    setDataInput = (childData) => {
        this.setState({
            dataSearch: childData,
            close: true,
        });
    };

    OpenListAddress = () => {
        this.setState({
            close: false,
        });
    };

    handleClickOutside = (event) => {
        if (!this.closeSearchAddress.current.contains(event.target)) {
            this.setState({
                close: true,
            });
        }
    };

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    render() {
        const { close, dataSearch, dataAddress } = this.state;

        return (
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                }}
                className="seachAdd"
            >
                <i className="fa fa-map-marker icon-marker"></i>
                <SearchInput
                    className="seachAddInput"
                    type="text"
                    placeholder="Nhập địa chỉ giao hàng"
                    value={dataSearch}
                    onChange={this.handleChange}
                    onClick={this.OpenListAddress}
                />
                <div
                    ref={this.closeSearchAddress}
                    className={
                        close
                            ? "close seachAdd-container"
                            : "seachAdd-container"
                    }
                >
                    <ul className="seachAdd-list">
                        {dataSearch.length !== 0 &&
                            (dataAddress.length === 0 ? (
                                <NoDataAddressItem data="Không tìm thấy" />
                            ) : (
                                dataAddress.map((item) => (
                                    <AddressItem
                                        onClick={() =>
                                            this.setDataInput(item.full_address)
                                        }
                                        key={item.place_id}
                                        data={item}
                                    />
                                ))
                            ))}
                    </ul>
                </div>
            </form>
        );
    }
}

export default SearchAddress;
