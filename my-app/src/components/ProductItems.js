import React from "react";
import Currency from "../common/Currency";
import Image from "../common/Image";
import ButtonAdd from "../common/ButtonAdd";

class Product extends React.Component {
    getInfoProduct = (product) => {
        this.props.handleClickOpenOptionBox(product);
    };
    render() {
        const { product } = this.props;
        return (
            <li
                className="category-product__items"
                onClick={() => {
                    this.getInfoProduct(product);
                }}
            >
                <Image
                    className="category-product__items-img"
                    src={product.image}
                    alt={`ảnh ${product.product_name}`}
                />
                <div className="category-product__items-info">
                    <h5 className="category-product__items-name">
                        {product.product_name}
                    </h5>
                    <p className="category-product__items-desc">
                        {product.description}
                    </p>
                    <Currency
                        className="category-product__items-price"
                        price={product.price}
                    />
                </div>
                <ButtonAdd />
            </li>
        );
    }
}

export default Product;
