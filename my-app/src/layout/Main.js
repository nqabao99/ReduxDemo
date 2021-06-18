import React from "react";
import PlacehoderLoading from "../common/PlacehoderLoading";
import CartContainer from "../components/CartContainer";
import CategoryContainer from "../components/CategoryContainer";
import ProductContainer from "../components/ProductContainer";
import NoneData from "../page/NoneData";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newData: [],
            loading: true,
            active: null,
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

    render() {
        const { active, newData, loading } = this.state;

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
                            />
                        </div>
                        <CartContainer />
                    </div>
                </main>
            );
        }
    }
}

export default Main;
