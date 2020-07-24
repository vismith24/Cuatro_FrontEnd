import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";

import "./App.scss";
import Home from "./Components/Home/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import NavBar from "./Components/NavBar/NavBar";
import Login from "./Components/Login/Login";
import Cookie from "js-cookie";
import MusicPlayer from './Components/MusicPlayer/MusicPlayer';
import Search from './Components/Search/Search';
import Store from './Components/Store/Store';
import Profile from "./Components/Profile/Profile";
import AddProduct from './Components/AddProduct/AddProduct'
import Cart from "./Components/Cart/Cart";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <div>
          <NavBar />

          <Switch>
            <Route exact path="/">
              <Redirect
                to={{
                  pathname: "/login",
                }}
              />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/music">
              <MusicPlayer />
            </PrivateRoute>
            <PrivateRoute path="/store">
              <Store />
            </PrivateRoute>
            <PrivateRoute path="/cart">
              <Cart />
            </PrivateRoute>
            <PrivateRoute path="/profile">
              <Profile />
            </PrivateRoute  >
            <PrivateRoute path="/search">
                <Search />
            </PrivateRoute>
            <PrivateRoute path="/home">
              <Home />
            </PrivateRoute>
            <PrivateRoute path="/add_item">
              <AddProduct />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    );
  }
}

function PrivateRoute({ children, ...rest }) {
  const JWT = Cookie.get("JWT") ? Cookie.get("JWT") : "null";
  return (
    <Route
      {...rest}
      render={({ location }) =>
        JWT != "null" ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
