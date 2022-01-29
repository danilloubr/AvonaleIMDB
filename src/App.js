import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import Home from "./pages/Home/Home";
import Favorite from "./pages/Favorite/Favorite";
import "react-responsive-modal/styles.css";

function App() {
  return (
    <div className="App">
      <ToastContainer
        theme="dark"
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/favorite">
            <Favorite />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
