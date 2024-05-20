import React, { useContext, useState, useEffect } from "react";
import { DateContext } from "../context/DateContext";

const Budget = () => {
  const { tripCosts } = useContext(DateContext);
  const [rentalCost, setRentalCost] = useState(0);
  const [vacationBudget, setVacationBudget] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);

  useEffect(() => {
    const total =
      parseFloat(rentalCost) +
      tripCosts.toll +
      tripCosts.fuel +
      parseFloat(vacationBudget);
    setTotalBudget(total);
  }, [rentalCost, vacationBudget, tripCosts]);

  return (
    <div className="budget">
      <h1>Budget</h1>
      <div className="budget-section">
        <label>
          Coût de la location:
          <input
            type="number"
            value={rentalCost}
            onChange={(e) => setRentalCost(e.target.value)}
          />
        </label>
      </div>
      <div className="budget-section">
        <h2>Trajet</h2>
        <p>Coût estimé des péages: {tripCosts.toll.toFixed(2)} €</p>
        <p>Coût estimé du carburant: {tripCosts.fuel.toFixed(2)} €</p>
      </div>
      <div className="budget-section">
        <label>
          Budget alloué pour les vacances:
          <input
            type="number"
            value={vacationBudget}
            onChange={(e) => setVacationBudget(e.target.value)}
          />
        </label>
      </div>
      <div className="budget-total">
        <h2>Budget total</h2>
        <p>{totalBudget.toFixed(2)} €</p>
      </div>
    </div>
  );
};

export default Budget;
