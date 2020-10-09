import React from "react";

const ToDoItem = (props) => (
  <div
    onClick={() => {
      props.onChecked(props.id);
    }}
  >
    <li>{props.text}</li>
  </div>
);
export default ToDoItem;
