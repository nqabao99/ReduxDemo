import React from "react";
import Currency from "../common/Currency";
import Image from "../common/Image";
import ButtonAdd from "../common/ButtonAdd";

class Product extends React.Component {
    getInfoProduct = (product) => {
        this.props.handleClickOpen(product);
    };
    renderProduct = (item) => {
        return (
            <li
                className="category-product__items"
                // key={item._id}
                onClick={() => {
                    this.getInfoProduct(item);
                }}
            >
                <Image
                    className="category-product__items-img"
                    src={item.image}
                    alt={`ảnh ${item.product_name}`}
                />
                <div className="category-product__items-info">
                    <h5 className="category-product__items-name">
                        {item.product_name}
                    </h5>
                    <p className="category-product__items-desc">
                        {item.description}
                    </p>
                    <Currency
                        className="category-product__items-price"
                        price={item.price}
                    />
                </div>
                <ButtonAdd />
            </li>
        );
    };

    render() {
        const { categories } = this.props;

        return (
            this.renderProduct(categories)
        );
    }
}

export default Product;
