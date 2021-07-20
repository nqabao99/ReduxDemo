import React from "react";
import { useDispatch, useSelector } from "react-redux";
import HobbyList from "../Home/HobbyList/index";
import { addNewHobby, setActiveHobby } from "../actions/hobby";

function HomePage(props) {
  const hobbyList = useSelector((state) => state.hobby.list);
  const activeId = useSelector((state) => state.hobby.activeId);
  const dispatch = useDispatch();

  const handleAddHobbyClick = () => {
    //random bobby object
    let newId = Math.random().toString(36).substring(7);
    const newHobby = {
      id: newId,
      title: `hobby ${newId}`,
    };

    //Dispatch action
    const action = addNewHobby(newHobby);
    dispatch(action);
  };

  const handleHobbyClick = (hobby) => {
    const action = setActiveHobby(hobby);
    dispatch(action);
  };

  return (
    <div>
      <h1>Demo redux</h1>

      <button onClick={handleAddHobbyClick}>Random Hobby</button>

      <HobbyList
        hobbyList={hobbyList}
        activeId={activeId}
        onHobbyClick={handleHobbyClick}
      />
    </div>
  );
}

export default HomePage;
