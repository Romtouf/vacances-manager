import React, { useContext, useState, useEffect } from "react";
import { DateContext } from "../context/DateContext";

const Planning = () => {
  const { dates } = useContext(DateContext);
  const [planning, setPlanning] = useState([]);

  useEffect(() => {
    if (dates.startDate && dates.endDate) {
      const start = new Date(dates.startDate);
      const end = new Date(dates.endDate);
      const days = [];

      for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
        days.push(new Date(d));
      }

      const initialPlanning = days.map((day) => ({
        date: day.toISOString().split("T")[0],
        morning: "",
        midday: "",
        afternoon: "",
        evening: "",
      }));

      setPlanning(initialPlanning);
    }
  }, [dates]);

  const handleInputChange = (index, period, value) => {
    const newPlanning = [...planning];
    newPlanning[index][period] = value;
    setPlanning(newPlanning);
  };

  return (
    <div className="planning">
      <h1>Planning</h1>
      {planning.map((day, index) => (
        <div key={index} className="day-planning">
          <h2>
            {new Date(day.date).toLocaleDateString("fr-FR", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </h2>
          <div className="planning-period">
            <label>
              Matin:
              <input
                type="text"
                value={day.morning}
                onChange={(e) =>
                  handleInputChange(index, "morning", e.target.value)
                }
              />
            </label>
            <label>
              Midi:
              <input
                type="text"
                value={day.midday}
                onChange={(e) =>
                  handleInputChange(index, "midday", e.target.value)
                }
              />
            </label>
            <label>
              Après-midi:
              <input
                type="text"
                value={day.afternoon}
                onChange={(e) =>
                  handleInputChange(index, "afternoon", e.target.value)
                }
              />
            </label>
            <label>
              Soirée:
              <input
                type="text"
                value={day.evening}
                onChange={(e) =>
                  handleInputChange(index, "evening", e.target.value)
                }
              />
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Planning;
