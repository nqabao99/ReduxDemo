import React from "react";
import "../assets/productoption.scss";
import Image from "../common/Image";
import Input from "../common/SearchInput";
import Currency from "../common/Currency";

class ProductOption extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productSize: this.props.infoProduct.variants[0].val,
            productPrice: this.props.infoProduct.variants[0].price,
            amount: 1,
            topping: 0,
            nameTopping: "",
            totalPrice: 0,
        };
    }

    handleProductSize = (item) => {
        this.setState({
            productSize: item.val,
            productPrice: item.price,
        });
    };

    handlePlus = () => {
        this.setState({
            amount: this.state.amount + 1,
        });
    };

    handleMinus = () => {
        if (this.state.amount > 0) {
            this.setState({
                amount: this.state.amount - 1,
            });
        }
    };

    handleProductToping = (item) => {
        let check = document.getElementById(item.code);

        if (check.checked === true) {
            this.setState({
                topping: this.state.topping + item.price,
                nameTopping: this.state.nameTopping.concat(
                    ` ${item.product_name} +`
                ),
            });
        } else {
            this.setState({
                topping: this.state.topping - item.price,
                nameTopping: this.state.nameTopping.replace(
                    ` ${item.product_name} +`,
                    ""
                ),
            });
        }
    };

    getInfoProduct = () => {
        let product = {
            product_name: this.props.infoProduct.product_name,
            image: this.props.infoProduct.image,
            topping_list: this.props.infoProduct.topping_list,
            variants: this.props.infoProduct.variants,

            toppingPrice: this.state.topping,
            productPrice: this.state.productPrice,
            productSize: this.state.productSize,
            nameTopping: this.state.nameTopping,
            amount: this.state.amount,
            note: document.getElementById("note").value,
            totalPrice:
                this.state.amount *
                (this.state.productPrice + this.state.topping),
        };

        this.props.getDataOpitonProduct(product);
    };

    componentDidMount() {
        const { infoProduct } = this.props;
        if (
            infoProduct.productSize !== undefined &&
            infoProduct.amount !== undefined &&
            infoProduct.toppingPrice !== undefined &&
            infoProduct.productPrice !== undefined &&
            infoProduct.nameTopping !== undefined
        ) {
            this.setState({
                productSize: infoProduct.productSize,
                amount: infoProduct.amount,
                topping: infoProduct.toppingPrice,
                productPrice: infoProduct.productPrice,
                nameTopping: infoProduct.nameTopping,
            });
        }
    }

    render() {
        const { infoProduct, optionClose } = this.props;
        const { productSize, productPrice, amount, topping, nameTopping } =
            this.state;
        //console.log(infoProduct);
        return (
            <div className="overlay">
                <div className="overlay" onClick={this.props.onClick}></div>
                <div
                    className={
                        optionClose
                            ? "product-option-open  product-option"
                            : "product-option-close product-option"
                    }
                >
                    <div className="product-option__top">
                        <Image
                            src={infoProduct.image}
                            alt={`ảnh ${infoProduct.product_name}`}
                        />
                        <div className="product-option__top-info">
                            <p>{infoProduct.product_name}</p>
                            <p>{productSize}</p>
                            <p>{nameTopping.slice(0, -2)}</p>
                        </div>
                        <i
                            className="fa fa-times"
                            onClick={this.props.onClick}
                        ></i>
                    </div>

                    <div className="product-option__body">
                        <div className="product-option__body-option">
                            <p>Loại</p>
                            <div className="checkbox-container">
                                <p>Size-</p>
                                <div className="checkbox-items">
                                    {infoProduct.variants.map((item) => (
                                        <div
                                            className="checkbox"
                                            key={item.code}
                                        >
                                            <Input
                                                checked={
                                                    item.val === productSize
                                                        ? "checked"
                                                        : null
                                                }
                                                type="radio"
                                                name="radio"
                                                onClick={() => {
                                                    this.handleProductSize(
                                                        item
                                                    );
                                                }}
                                            />
                                            <span>
                                                {item.val} (
                                                <Currency
                                                    price={
                                                        item.price -
                                                        infoProduct.variants[0]
                                                            .price
                                                    }
                                                />
                                                )
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {infoProduct.topping_list.length !== 0 ? (
                                <div className="checkbox-container">
                                    <p>Topping-</p>
                                    <div className="checkbox-items">
                                        {infoProduct.topping_list.map(
                                            (item) => (
                                                <div
                                                    className="checkbox"
                                                    key={item.code}
                                                >
                                                    <Input
                                                        type="checkbox"
                                                        name="checkbox"
                                                        id={item.code}
                                                        onChange={() => {
                                                            this.handleProductToping(
                                                                item
                                                            );
                                                        }}
                                                        checked={
                                                            nameTopping.includes(
                                                                item.product_name
                                                            )
                                                                ? "checked"
                                                                : null
                                                        }
                                                    />
                                                    <span>
                                                        {item.product_name} (
                                                        <Currency
                                                            price={item.price}
                                                        />
                                                        )
                                                    </span>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            ) : null}
                        </div>
                        <form
                            className="main-container__left-product__form product-option__body-note"
                            action="#"
                        >
                            <i className="fa fa-pencil"></i>
                            <Input
                                id="note"
                                type="text"
                                placeholder="Thêm ghi chú món này"
                            />
                        </form>
                    </div>

                    <div className="product-option__bot">
                        <div className="product-option__bot-left">
                            <i
                                className="fa fa-minus-circle"
                                onClick={this.handleMinus}
                            ></i>
                            <span>{amount}</span>
                            <i
                                className="fa fa-plus-circle"
                                onClick={this.handlePlus}
                            ></i>
                        </div>
                        <div
                            className="product-option__bot-right"
                            onClick={this.getInfoProduct}
                        >
                            <Currency
                                className="btn addtocart"
                                price={amount * (productPrice + topping)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductOption;
