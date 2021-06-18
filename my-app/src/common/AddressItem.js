import React from 'react';

class AddressItem extends React.Component {
    render() {
        const { data } = this.props;
        let arr = data.split(", ");
        let first = arr[0];
        arr.shift(); //xoá phần tử đầu
        return (
            <li onClick={this.props.onClick}>
                <div className="icon">
                    <i className="fa fa-map-marker"></i>
                </div>
                <div className="text">
                    <p>{first}</p>
                    <p>{arr.join(", ")}</p>
                </div>
            </li>
        )
    }
}

export default AddressItem;

