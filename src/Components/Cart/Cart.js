import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import { withRouter } from "react-router";
// import request from "superagent";
import axios from 'axios';
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import ProductCard from "../ProductCard/ProductCard";
import CartCard from "./CartCard";
import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import { backendAPI } from "../../constants";
import Cookie from 'js-cookie';

class Cart extends Component {
  constructor(props) {
    super(props);

    // Sets up our initial state
    this.state = {
      error: false,
      hasMore: false,
      isLoading: false,
      cart: []
    };

    // Binds our scroll event handler
    window.onscroll = () => {
      const {
        loadStore,
        state: { error, isLoading, hasMore }
      } = this;

      // Bails early if:
      // * there's an error
      // * it's already loading
      // * there's nothing left to load
      if (error || isLoading || !hasMore) return;

      // Checks that the page has scrolled to the bottom
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        loadStore();
      }
    };
  }

  componentDidMount() {
    // Loads some users on initial load
    console.log('location', this.props.location)
    // try {
      // this.props.location.state.setRedirect(false)
     //}
     //catch(err) {}
    this.loadStore();
  }

  loadStore = () => {
    const JWT = Cookie.get("JWT") ? Cookie.get("JWT") : "null";
    this.setState({ isLoading: false }, () => {
        fetch(backendAPI + `/cart`,{
            method: "GET",
            headers: {
              Authorization: JWT,
            },
          })
        .then(res => res.json())
        .then(resJson => {
          this.setState({
            cart: resJson.cart
          });
        });
    });
  };

  render() {
    const JWT = Cookie.get("JWT") ? Cookie.get("JWT") : "null";
    const { error, hasMore, isLoading, cart } = this.state;

    return (
      <Container>
        <div>
          <Typography variant="h2">
            Your Cart
          </Typography>
          <Container maxWidth="md">
            {cart.map((item, index) => (
              <CartCard key={item} item={item} />
            ))}
          </Container>
          <Divider /> 
          {error && <div style={{ color: "#900" }}>{error}</div>}
          {isLoading && (
            <div style={{width: '100%'}}>
              <center>
                <CircularProgress />
              </center>              
            </div>
          )}
        </div>
      </Container>
    );
  }
}

export default withRouter(Cart);