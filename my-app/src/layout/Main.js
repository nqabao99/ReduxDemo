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
            infoProduct: null,
            optionClose: false,
            listProductOrder: [],
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
                infoProduct: null,
            });
        }, 300);
    };

    getDataOpitonProduct = (data) => {
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
                    ? ((item.amount += data.amount), (flag *= -1))
                    : (flag *= 1)
            );
            if (flag === 1) {
                this.setState({
                    listProductOrder: [...listProductOrder, data],
                });
            }
        }

        setTimeout(() => {
            this.setState({
                infoProduct: null,
            });
        }, 300);
    };

    handleClickOpen = (product) => {
        this.setState({
            optionClose: true,
            infoProduct: product,
        });
    };

    render() {
        const { active, newData, loading, infoProduct, listProductOrder } =
            this.state;

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
                        <CartContainer listProductOrder={listProductOrder} />
                    </div>
                    {infoProduct !== null ? (
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
