import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import User from "./components/User";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/:role">
            <User />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
