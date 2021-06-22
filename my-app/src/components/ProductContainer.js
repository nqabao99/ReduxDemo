import React from "react";
import SearchInput from "../common/SearchInput";
import ProductItems from "./ProductItems";
import Image from "../common/Image";
import src_noneproduct from "../assets/img/noneproduct.png";

class ProductContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            copyData: [...this.props.data],
        };
    }

    handleSearchProduct = (e) => {
        let filterProduct = [];
        this.props.data.map((item) =>
            item.ListProduct.filter(
                (i) =>
                    i.product_name
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase()) &&
                    filterProduct.push(i)
            )
        );

        //xoá phần từ trùng lặp
        let newFilterProduct = filterProduct.filter((elem, index, self) => {
            return index === self.indexOf(elem);
        });

        this.setState({ search: e.target.value, copyData: newFilterProduct });
    };

    handleOnScrollMenu = () => {
        let arr = document.querySelectorAll(".categoryActive");
        let check = window.scrollY - 35;

        arr.forEach((item) =>
            document.getElementById(item.id).offsetTop <= check &&
            check <
                document.getElementById(item.id).offsetTop +
                    document.getElementById(item.id).offsetHeight
                ? this.getIdActive(item.id)
                : null
        );
    };

    getIdActive = (id) => {
        this.props.getIdActive(id);
    };

    componentDidMount() {
        window.addEventListener("scroll", this.handleOnScrollMenu);
    }
    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleOnScrollMenu);
    }

    render() {
        const { data, handleClickOpenOptionBox } = this.props;
        const { search, copyData } = this.state;

        return (
            <div className="main-container__left-product">
                <form className="main-container__left-product__form" action="#">
                    <i className="fa fa-search"></i>
                    <SearchInput
                        type="text"
                        placeholder="Tìm kiếm sản phẩm"
                        onChange={this.handleSearchProduct}
                    />
                </form>

                {search.length === 0 ? (
                    data.map((item) => (
                        <div
                            className="category categoryActive"
                            key={item._id}
                            id={item._id}
                        >
                            <p className="category-name">{item.name}</p>
                            <ul className="category-product__list">
                                {item.ListProduct.map((items) => (
                                    <ProductItems
                                        key={items._id}
                                        product={items}
                                        handleClickOpenOptionBox={
                                            handleClickOpenOptionBox
                                        }
                                    />
                                ))}
                            </ul>
                        </div>
                    ))
                ) : copyData.length !== 0 ? (
                    <div className="category">
                        <ul className="category-product__list">
                            {copyData.map((items, index) => (
                                <ProductItems
                                    key={index}
                                    product={items}
                                    handleClickOpenOptionBox={
                                        handleClickOpenOptionBox
                                    }
                                />
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className="noneProduct">
                        <div>
                            <Image src={src_noneproduct} alt="none product" />
                            <p>Rất tiếc chúng tôi không tìm thấy sản phẩm!</p>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default ProductContainer;
