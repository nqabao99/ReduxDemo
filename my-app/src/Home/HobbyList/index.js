import React from "react";
import "./style.css";

function index({ hobbyList, activeId, onHobbyClick }) {
  const onClick = (item) => {
    if (onHobbyClick) {
      onHobbyClick(item);
    }
  };

  return (
    <ul>
      {hobbyList.map((item) => (
        <li
          className={item.id === activeId ? "active" : ""}
          onClick={() => onClick(item)}
          key={item.id}
        >
          {item.title}
        </li>
      ))}
    </ul>
  );
}

export default index;
