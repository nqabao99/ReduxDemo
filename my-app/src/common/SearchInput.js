import React from 'react';


class SearchInput extends React.Component {
    render() {
        return (
            <input id={this.props.id} defaultChecked={this.props.checked} className={this.props.className} name={this.props.name} type={this.props.type} value={this.props.value} placeholder={this.props.placeholder} onChange={this.props.onChange} onClick={this.props.onClick} onFocus={this.props.onFocus}
                onBlur={this.props.onBlur} />
        )
    }
}

export default SearchInput;