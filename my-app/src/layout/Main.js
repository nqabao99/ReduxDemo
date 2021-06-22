import React from "react";
import PlacehoderLoading from "../common/PlacehoderLoading";
import CartContainer from "../components/CartContainer";
import CategoryContainer from "../components/CategoryContainer";
import ProductContainer from "../components/ProductContainer";
import NoneData from "../page/NoneData";

import ProductOption from "../components/ProductOption";
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newData: [],
            loading: true,
            active: null, //new
            infoProduct: [],
            optionClose: false,
            listProductOrder: [],
            flag: -1,
        };
    }

    mergeData = (categories, products) => {
        categories.map((category) => {
            let arr = [];
            products.data.map((product) => {
                if (product.categ_id.includes(category.id)) {
                    arr.push(product);
                }
                return arr;
            });
            category.ListProduct = arr; // Tạo ra key ListProduct trong category để hứng giá trị của listProduct
            return category;
        });
        return categories;
    };

    componentDidMount() {
        fetch("https://api.thecoffeehouse.com/api/v2/category/web")
            .then((response) => response.json())
            .then((categories) => {
                fetch("https://api.thecoffeehouse.com/api/v2/menu")
                    .then((response) => response.json())
                    .then((products) => {
                        this.mergeData(categories, products);
                        let copyData = [];
                        categories.map(
                            (item) =>
                                item.ListProduct.length > 0 &&
                                copyData.push(item)
                        );

                        this.setState({
                            newData: copyData,
                            loading: false,
                            active: categories[0]._id,
                        });
                    });
            });
    }

    getatId = (id) => {
        let check = document.querySelectorAll(".active");

        if (check.length > 0) {
            document.querySelector(".active").classList.remove("active");
        }
        document.getElementById(`at${id}`).classList.add("active");
    };

    //new
    handleClickClose = () => {
        this.setState({
            optionClose: false,
        });
        setTimeout(() => {
            this.setState({
                infoProduct: [],
            });
        }, 300);
    };

    getDataOpitonProduct = (data) => {
        if (this.state.flag === -1) {
            let { listProductOrder } = this.state;
            this.setState({
                optionClose: false,
            });

            if (listProductOrder.length === 0) {
                this.setState({
                    listProductOrder: [...listProductOrder, data],
                });
            } else {
                let flag = 1;
                listProductOrder.map((item) =>
                    item.product_name === data.product_name &&
                    item.productSize === data.productSize &&
                    item.nameTopping === data.nameTopping &&
                    item.note === data.note
                        ? ((item.amount += data.amount),
                          (item.totalPrice += data.totalPrice),
                          (flag *= -1))
                        : (flag *= 1)
                );
                if (flag === 1) {
                    this.setState({
                        listProductOrder: [...listProductOrder, data],
                    });
                }
            }
        } else {
            this.setState({
                listProductOrder: this.state.listProductOrder.fill(
                    data,
                    this.state.flag,
                    this.state.flag + 1
                ),
            });
        }

        setTimeout(() => {
            this.setState({
                infoProduct: [],
                flag: -1,
            });
        }, 300);
    };

    handleClickOpen = (data) => {
        let products = {
            product_name: data.product_name,
            image: data.image,
            topping_list: data.topping_list,
            variants: data.variants,
        };

        this.setState({
            optionClose: true,
            infoProduct: products,
        });
    };

    openOptionProduct = (data, index) => {
        this.setState({
            optionClose: true,
            infoProduct: data,
            flag: index,
        });
    };

    render() {
        const { active, newData, loading, infoProduct, listProductOrder } =
            this.state;

        //console.log(listProductOrder);
        if (loading) {
            return <PlacehoderLoading />;
        } else if (newData.length === 0) {
            return <NoneData />;
        } else {
            return (
                <main className="main">
                    <div className="main-container container">
                        <div className="main-container__left">
                            <CategoryContainer active={active} data={newData} />
                            <ProductContainer
                                getatId={this.getatId}
                                data={newData}
                                handleClickOpen={this.handleClickOpen}
                            />
                        </div>
                        <CartContainer
                            listProductOrder={listProductOrder}
                            openOptionProduct={this.openOptionProduct}
                        />
                    </div>
                    {infoProduct.length !== 0 ? (
                        <ProductOption
                            infoProduct={infoProduct}
                            optionClose={this.state.optionClose}
                            onClick={this.handleClickClose}
                            getDataOpitonProduct={this.getDataOpitonProduct}
                        />
                    ) : null}
                </main>
            );
        }
    }
}

export default Main;
