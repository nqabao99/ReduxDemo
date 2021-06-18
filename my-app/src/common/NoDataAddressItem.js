import React from 'react';

class NoDataAddressItem extends React.Component {
    render() {
        const { data } = this.props;
        return (
            <li>
                <div className="icon">
                    <i className="fa fa-map-marker"></i>
                </div>
                <div className="text">
                    <p>{data}</p>
                    <p></p>
                </div>
            </li>
        )
    }
}
export default NoDataAddressItem;