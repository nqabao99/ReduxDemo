import React from 'react';
import '../assets/loading.scss';
import CartContainer from '../components/CartContainer';
import SearchInput from '../common/SearchInput';

class ProductsLoading extends React.Component {
    render() {
        return (
            <li className="category-product__items">
                <div className="category-product__items-img">
                    <div className="ploading imgloading"></div>
                </div>
                <div className="w100">
                    <div className="ploading divloading"></div>
                    <div className="ploading divloading"></div>
                    <div className="ploading divloading"></div>
                </div>
            </li>
        )
    }
}


class PlacehoderLoading extends React.Component {
    render() {
        return (
            <main className="main">
                <div className="main-container container">
                    <div className="main-container__left">
                        <div className="main-container__left-navmenu">
                            <ul className="main-container__left-navmenu__list">
                                <li className="ploading liloading"></li>
                                <li className="ploading liloading"></li>
                                <li className="ploading liloading"></li>
                                <li className="ploading liloading"></li>
                                <li className="ploading liloading"></li>
                                <li className="ploading liloading"></li>
                                <li className="ploading liloading"></li>
                                <li className="ploading liloading"></li>
                            </ul>
                        </div>

                        <div className="main-container__left-product">
                            <form className="main-container__left-product__form" action="#">
                                <i className="fa fa-search"></i>
                                <SearchInput type="text" placeholder="Tìm kiếm sản phẩm" />
                            </form>
                            <div className="category">
                                <ul className="category-product__list mt20">
                                    <ProductsLoading />
                                    <ProductsLoading />
                                    <ProductsLoading />
                                    <ProductsLoading />
                                    <ProductsLoading />
                                    <ProductsLoading />
                                    <ProductsLoading />
                                    <ProductsLoading />
                                </ul>
                            </div>
                        </div>
                    </div>
                    <CartContainer />
                </div>
            </main>



        )
    }
}

export default PlacehoderLoading;