import React from "react";

import "../assets/itemProductOrder.scss";
import Currency from "../common/Currency";
class ItemProductOrder extends React.Component {
    render() {
        const { infoProduct, index } = this.props;
        return (
            <div
                className="itemOrder"
                onClick={() => {
                    this.props.listOrderClickOpenOptionBox(infoProduct, index);
                }}
            >
                <div className="itemOrder-left">
                    <div className="itemOrder-left__amount">
                        <p>{infoProduct.amount}</p>
                    </div>
                    <div className="itemOrder-left__infoProduct">
                        <p className="itemOrder-left__infoProduct-name">
                            {infoProduct.product_name}
                        </p>
                        <p className="itemOrder-left__infoProduct-size">
                            {infoProduct.productSize}
                        </p>
                        <p className="itemOrder-left__infoProduct-size">
                            {infoProduct.nameTopping.slice(0, -2)}
                        </p>
                        <p className="itemOrder-left__infoProduct-note">
                            {infoProduct.note}
                        </p>
                    </div>
                </div>
                <div className="itemOrder-right">
                    <Currency price={infoProduct.totalPrice} />
                </div>
            </div>
        );
    }
}

export default ItemProductOrder;
