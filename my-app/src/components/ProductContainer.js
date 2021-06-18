import React from "react";
import SearchInput from "../common/SearchInput";
import ProductItems from "./ProductItems";
import Image from "../common/Image";
import src_noneproduct from "../assets/img/noneproduct.png";

import ProductOption from "../components/ProductOption";

class ProductContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            optionClose: false,
            infoProduct: null,
            copy: [...this.props.data]
        };
    }

    handleSearch = (e) => {
        let filterProduct = [];
        this.props.data.map((item) =>
            item.ListProduct.filter(
                (i) =>
                    i.product_name
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase()) && filterProduct.push(i)
            )
        );

        //xoá phần từ trùng lặp
        let newFilterProduct = filterProduct.filter((elem, index, self) => {
            return index === self.indexOf(elem);
        })



        this.setState({ search: e.target.value, copy: newFilterProduct });
    };

    handleOnScroll = (data) => {
        let arr = document.querySelectorAll(".categoryActive");
        let check = window.scrollY - 35;

        arr.forEach((item) =>
            document.getElementById(item.id).offsetTop <= check &&
                check <
                document.getElementById(item.id).offsetTop +
                document.getElementById(item.id).offsetHeight
                ? this.getId(item.id)
                : null
        );
    };

    getId = (id) => {
        this.props.getatId(id);
    };

    componentDidMount() {
        window.addEventListener("scroll", this.handleOnScroll);
    }
    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleOnScroll);
    }

    handleClickOpen = (product) => {
        this.setState({
            optionClose: true,
            infoProduct: product,
        });
    };

    handleClickClose = () => {
        this.setState({
            optionClose: false,
        });
        setTimeout(() => {
            this.setState({
                infoProduct: null,
            });
        }, 300);
    };

    render() {
        const { data } = this.props;
        const { infoProduct, search, copy } = this.state;

        return (
            <div className="main-container__left-product">
                <form className="main-container__left-product__form" action="#">
                    <i className="fa fa-search"></i>
                    <SearchInput
                        type="text"
                        placeholder="Tìm kiếm sản phẩm"
                        onChange={this.handleSearch}
                    />
                </form>

                {
                    search.length === 0
                        ?
                        data.map((item) => (
                            <div className="category categoryActive" key={item._id} id={item._id}>
                                <p className="category-name">{item.name}</p>
                                <ul className="category-product__list">
                                    {item.ListProduct.map((items) => (
                                        <ProductItems
                                            key={items._id}
                                            categories={items}
                                            search={this.state.search}
                                            handleClickOpen={this.handleClickOpen}
                                        />
                                    ))}
                                </ul>
                            </div>
                        ))
                        :
                        copy.length !== 0
                            ?
                            <div className="category">
                                <ul className="category-product__list">
                                    {copy.map((items, index) => (
                                        <ProductItems
                                            key={index}
                                            categories={items}
                                            handleClickOpen={this.handleClickOpen}
                                        />
                                    ))}
                                </ul>
                            </div>
                            :
                            <div className="noneProduct">
                                <div>
                                    <Image src={src_noneproduct} alt="none product" />
                                    <p>Rất tiếc chúng tôi không tìm thấy sản phẩm!</p>
                                </div>
                            </div>
                }



                {infoProduct !== null ? (
                    <ProductOption
                        infoProduct={infoProduct}
                        optionClose={this.state.optionClose}
                        onClick={this.handleClickClose}
                    />
                ) : null}
            </div>
        );
    }
}

export default ProductContainer;
