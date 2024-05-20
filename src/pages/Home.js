import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DateContext } from "../context/DateContext";

const Home = () => {
  const { dates, setDates } = useContext(DateContext);

  const handleDateChange = (e) => {
    setDates({
      ...dates,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="home">
      <h1>Planifier vos vacances</h1>
      <form className="home-form">
        <label>
          Titre du voyage:
          <input type="text" name="title" />
        </label>
        <label>
          Photo du lieu:
          <input type="file" name="photo" />
        </label>
        <label>
          Dates du séjour:
          <input
            type="date"
            name="startDate"
            value={dates.startDate}
            onChange={handleDateChange}
          />
          <input
            type="date"
            name="endDate"
            value={dates.endDate}
            onChange={handleDateChange}
          />
        </label>
      </form>
      <div className="navigation-buttons">
        <Link to="/trajet">Trajet</Link>
        <Link to="/todo-list">Todo-List</Link>
        <Link to="/planning">Planning</Link>
        <Link to="/budget">Budget</Link>
      </div>
    </div>
  );
};

export default Home;
