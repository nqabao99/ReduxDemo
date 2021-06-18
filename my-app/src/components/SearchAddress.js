import React from 'react';
import SearchInput from '../common/SearchInput';
import AddressItem from '../common/AddressItem';
import NoDataAddressItem from '../common/NoDataAddressItem';
import '../assets/addressitem.scss';

class SearchAddress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSearch: "",
            dataAddress: [],
            close: false
        };
    }


    handleChange = (e) => {
        this.setState({
            dataSearch: e.target.value
        })

        fetch(`https://order.thecoffeehouse.com/api/location?address=${this.state.dataSearch}`)
            .then((response) => response.json())
            .then(data => {
                if (data.status === "OK") {
                    this.setState({
                        dataAddress: data.predictions
                    })
                } else {
                    this.setState({
                        dataAddress: []
                    })
                }
            });
    }

    setDataInput = (childData) => {
        this.setState({
            dataSearch: childData,
            close: true
        })
    }

    OpenListAddress = () => {
        this.setState({
            close: false
        })
    }

    render() {
        const { close, dataSearch, dataAddress } = this.state;
        
        return (
            <form onSubmit={(e) => { e.preventDefault() }} className="seachAdd" >
                <i className="fa fa-map-marker icon-marker"></i>
                <SearchInput className="seachAddInput" type="text" placeholder="Nhập địa chỉ giao hàng" value={dataSearch} onChange={this.handleChange} onClick={this.OpenListAddress} />
                <div className={close ? 'close seachAdd-container' : 'seachAdd-container'} >
                    <ul className="seachAdd-list">
                        {
                            dataSearch.length !== 0
                                ? dataAddress.length === 0
                                    ?
                                    <NoDataAddressItem data="Không tìm thấy" />
                                    :
                                    dataAddress.map(item =>
                                    (
                                        <AddressItem onClick={() => this.setDataInput(item.description)} key={item.place_id} data={item.description} />
                                    ))
                                : null
                        }
                    </ul>
                </div>
            </form >
        )
    }
}

export default SearchAddress;