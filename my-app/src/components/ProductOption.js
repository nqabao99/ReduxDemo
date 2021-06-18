import React from 'react';
import '../assets/productoption.scss';
import Image from '../common/Image';
import Input from '../common/SearchInput';
import Currency from '../common/Currency';


class ProductOption extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productSize: this.props.infoProduct.variants[0].val,
            productPrice: this.props.infoProduct.variants[0].price,
            amount: 1,
            topping: 0,
            nameTopping: ''
        }
    }

    handleProductSize = (size, price) => {
        this.setState({
            productSize: size,
            productPrice: price
        })
    }

    handlePlus = () => {
        this.setState({
            amount: this.state.amount + 1
        })
    }

    handleMinus = () => {
        if (this.state.amount > 0) {
            this.setState({
                amount: this.state.amount - 1
            })
        }

    }

    handleProductToping = (item) => {
        let check = document.getElementById(item.code);

        if (check.checked === true) {
            this.setState({
                topping: this.state.topping + item.price,
                nameTopping: this.state.nameTopping.concat(` ${item.product_name} +`)
            })
        } else {
            this.setState({
                topping: this.state.topping - item.price,
                nameTopping: this.state.nameTopping.replace(` ${item.product_name} +`, '')
            })
        }

    }

    render() {
        const { infoProduct, optionClose } = this.props;
        const { productSize, productPrice, amount, topping, nameTopping } = this.state;


        return (
            <div className="overlay">
                <div className="overlay" onClick={this.props.onClick}></div>
                <div className={optionClose ? 'product-option-open  product-option' : 'product-option-close product-option'}>
                    <div className="product-option__top">
                        <Image src={infoProduct.image} alt={`ảnh ${infoProduct.product_name}`} />
                        <div className="product-option__top-info">
                            <p>{infoProduct.product_name}</p>
                            <p>{productSize}</p>
                            <p>{nameTopping.slice(0, -2)}</p>
                        </div>
                        <i className="fa fa-times" onClick={this.props.onClick}></i>
                    </div>

                    <div className="product-option__body">
                        <div className="product-option__body-option">
                            <p>Loại</p>
                            <div className="checkbox-container">
                                <p>Size-</p>
                                <div className="checkbox-items">
                                    {
                                        infoProduct.variants.map((item) => (
                                            <div className="checkbox" key={item.code}>
                                                <Input checked={item.val === infoProduct.variants[0].val ? 'checked' : null} type="radio" name="radio" onClick={() => { this.handleProductSize(item.val, item.price) }} />
                                                <span>{item.val} (<Currency price={item.price - infoProduct.variants[0].price} />)</span>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                            {infoProduct.topping_list.length !== 0
                                ? <div className="checkbox-container">
                                    <p>Topping-</p>
                                    <div className="checkbox-items">
                                        {
                                            infoProduct.topping_list.map((item) => (
                                                <div className="checkbox" key={item.code}>
                                                    <Input type="checkbox" name="checkbox" id={item.code}
                                                        onChange={() => { this.handleProductToping(item) }}

                                                    />
                                                    <span>{item.product_name} (<Currency price={item.price} />)</span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                : null}
                        </div>
                        <form className="main-container__left-product__form product-option__body-note" action="#">
                            <i className="fa fa-pencil"></i>
                            <Input type="text" placeholder="Thêm ghi chú món này" />
                        </form>
                    </div>

                    <div className="product-option__bot">
                        <div className="product-option__bot-left">
                            <i className="fa fa-minus-circle" onClick={this.handleMinus}></i>
                            <span>{amount}</span>
                            <i className="fa fa-plus-circle" onClick={this.handlePlus}></i>
                        </div>
                        <div className="product-option__bot-right" onClick={this.props.onClick}>
                            <Currency className="btn addtocart" price={amount * (productPrice + topping)} />
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

export default ProductOption;