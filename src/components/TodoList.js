import React, { useState } from "react";

const TodoList = ({ title, items, setItems }) => {
  const handleAddItem = () => {
    const newItem = prompt("Ajouter un nouvel item:");
    if (newItem) {
      setItems([...items, { text: newItem, done: false }]);
    }
  };

  const handleUpdateItem = (index) => {
    const updatedItem = prompt("Modifier cet item:", items[index].text);
    if (updatedItem) {
      const newItems = [...items];
      newItems[index].text = updatedItem;
      setItems(newItems);
    }
  };

  const handleDeleteItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleToggleDone = (index) => {
    const newItems = [...items];
    newItems[index].done = !newItems[index].done;
    setItems(newItems);
  };

  return (
    <div className="todo-list">
      <h2>{title}</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index} className={item.done ? "done" : ""}>
            <span onClick={() => handleToggleDone(index)}>{item.text}</span>
            <button onClick={() => handleUpdateItem(index)}>Modifier</button>
            <button onClick={() => handleDeleteItem(index)}>Supprimer</button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddItem}>Ajouter un item</button>
    </div>
  );
};

const TodoLists = () => {
  const [packingItems, setPackingItems] = useState([]);
  const [toysItems, setToysItems] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [vehicleItems, setVehicleItems] = useState([]);

  return (
    <div className="todo-lists">
      <h1>Préparation du voyage aller</h1>
      <TodoList
        title="Affaires à emmener"
        items={packingItems}
        setItems={setPackingItems}
      />
      <TodoList
        title="Jeux/Jouets à emmener"
        items={toysItems}
        setItems={setToysItems}
      />
      <TodoList
        title="Nourriture à emmener"
        items={foodItems}
        setItems={setFoodItems}
      />
      <TodoList
        title="À faire et à emmener pour le véhicule"
        items={vehicleItems}
        setItems={setVehicleItems}
      />

      <h1>Préparation du retour de vacances</h1>
      <TodoList
        title="Affaires à emmener"
        items={packingItems}
        setItems={setPackingItems}
      />
      <TodoList
        title="Jeux/Jouets à emmener"
        items={toysItems}
        setItems={setToysItems}
      />
      <TodoList
        title="Nourriture à emmener"
        items={foodItems}
        setItems={setFoodItems}
      />
      <TodoList
        title="À faire et à emmener pour le véhicule"
        items={vehicleItems}
        setItems={setVehicleItems}
      />
    </div>
  );
};

export default TodoLists;
