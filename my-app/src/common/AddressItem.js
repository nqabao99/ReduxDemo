import React from "react";

class AddressItem extends React.Component {
    render() {
        const { data } = this.props;
        return (
            <li onClick={this.props.onClick}>
                <div className="icon">
                    <i className="fa fa-map-marker"></i>
                </div>
                <div className="text">
                    <p>{data.title_address}</p>
                    <p>{data.full_address}</p>
                </div>
            </li>
        );
    }
}

export default AddressItem;
