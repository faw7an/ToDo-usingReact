import React, { useEffect, useState } from "react";

function App() {
  const [inputs, addItem] = useState({
    item: "",
  });
  const [newAddedItem, updateAdddedItem] = useState([]);

  useEffect(() => {
    const savedList = localStorage.getItem("todoList");
    if (savedList) {
      updateAdddedItem(JSON.parse(savedList)); // Parse and set the list from localStorage
    }
  }, []);

  // Save the todoList to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(newAddedItem));
  }, [newAddedItem]);

  function handleChange(event) {
    const { name, value } = event.target;
    addItem((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  }

  function addBtn(e) {
    updateAdddedItem((prevItems) => {
      return [...prevItems, inputs.item];
    });
    addItem({ item: "" });
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input
          onChange={handleChange}
          name="item"
          type="text"
          value={inputs.item}
        />
        <button onClick={addBtn} onKeyDown={addBtn}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {newAddedItem.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;