import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Trajet from "./components/Trajet";
import TodoLists from "./components/TodoList";
import Planning from "./components/Planning";
import Budget from "./components/Budget";
import { DateProvider } from "./context/DateContext";
import "./styles/App.scss";

const App = () => {
  return (
    <DateProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route exact path="/" component={Home} />
            <Route path="/trajet" component={Trajet} />
            <Route path="/todo-list" component={TodoLists} />
            <Route path="/planning" component={Planning} />
            <Route path="/budget" component={Budget} />
          </Routes>
        </div>
      </Router>
    </DateProvider>
  );
};

export default App;
