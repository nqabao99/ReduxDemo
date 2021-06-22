import React from "react";

import CategoryItems from "./CategoryItems";

class CategoryContainer extends React.Component {
    render() {
        const { active, data } = this.props;

        return (
            <div className="main-container__left-navmenu">
                <ul className="main-container__left-navmenu__list">
                    {data.map((item) => (
                        <CategoryItems
                            dataFirst={active}
                            categories={item}
                            key={item._id}
                        />
                    ))}
                </ul>
            </div>
        );
    }
}

export default CategoryContainer;
