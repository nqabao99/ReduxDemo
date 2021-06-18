import React from 'react';


class CategoryItems extends React.Component {
    render() {
        const { dataFirst, categories } = this.props;

        return (
            <li id={`at${categories._id}`} className={dataFirst === categories._id ? 'active main-container__left-navmenu__items' : 'main-container__left-navmenu__items'}><a href={`#${categories._id}`}>{categories.name}</a></li>
        );
    }
}

export default CategoryItems;