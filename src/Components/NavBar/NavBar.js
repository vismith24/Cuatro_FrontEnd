import React from "react";
import { Button } from "shards-react";
import { Nav, NavItem, NavLink } from "shards-react";
import "./NavBar.css";
import SearchBar from "./SearchBar";
import Cookie from "js-cookie";

export default class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect : false
    }
  }
  logout() {
    Cookie.set("JWT", null);
    window.location.replace('/login')
  }
  render() {
    const JWT = Cookie.get("JWT") ? Cookie.get("JWT") : "null";
    return (
      <div className="container-fluid navBar">
        <Nav style={{ justifyContent: "flex-end" }}>
          <div
            style={{
              display: "flex",
              flex: 1,
              justifyContent: "flex-start",
            }}
          >
            <img
              src={require("../../images/cuatro-logo.png")}
              style={{ height: 60 }}
              alt="Why are we even alive just to suffer?"
            />
            
          </div>
          {JWT != "null" ? <SearchBar />: null}
          <NavItem className="navItem">
            <NavLink active href="/home">
              Home
            </NavLink>
          </NavItem>

          {JWT != "null" ? (
              <NavItem className="navItem">
                <NavLink active href="/music">
                  Music
                </NavLink>
              </NavItem> ) : null }
              {JWT != "null" ? (
                <NavItem className="navItem">
                  <NavLink active href="/store">
                    Store
                  </NavLink>
                </NavItem> ) : null }
          {JWT != "null" ? (
            <NavItem className="navItem">
                <NavLink href="#" onClick={this.logout}>Log out</NavLink>
            </NavItem>
          ): null}     
          
          {JWT == "null" ? (
            <NavItem className="navItem">
              <NavLink href="/login">Log in</NavLink>
            </NavItem>
          ): null}
        </Nav>
      </div>
    );
  }
}
