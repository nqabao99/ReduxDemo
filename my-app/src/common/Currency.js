import React from 'react';


class Currency extends React.Component {
    render() {
        return (
            <p className={this.props.className}>
                {
                    typeof this.props.price === 'number'
                        ?
                        String(this.props.price).replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                        :
                        this.props.price.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                }
                <span className="format-currency">đ</span>
            </p>
        )
    }
}

export default Currency;