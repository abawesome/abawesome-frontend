import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import registerForm from "./components/registerForm";
import loginForm from "./components/loginForm";
import authService from "./services/authService";
import NavBar from "./components/navBar";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = authService.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <BrowserRouter>
            <Switch>
              <Route path="/register" component={registerForm} />
              <Route path="/login" component={loginForm} />
            </Switch>
          </BrowserRouter>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
