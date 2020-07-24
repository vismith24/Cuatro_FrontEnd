import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import { withRouter } from "react-router";
// import request from "superagent";
import axios from 'axios';
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import ProductCard from "../ProductCard/ProductCard";
import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import { backendAPI } from "../../constants";
import Cookie from 'js-cookie';
class Search extends Component {
  constructor(props) {
    super(props);

    // Sets up our initial state
    this.state = {
      error: false,
      hasMore: false,
      isLoading: false,
      searchText: this.props.location ? this.props.location.state.searchText : "",
      result: []
    };

    // Binds our scroll event handler
    window.onscroll = () => {
      const {
        loadUsers,
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
        loadUsers();
      }
    };
  }

  componentDidMount() {
    // Loads some users on initial load
    console.log('location', this.props.location)
    // try {
    //   this.props.location.state.setRedirect(false)
    // }
    // catch(err) {}
    const JWT = Cookie.get("JWT") ? Cookie.get("JWT") : "null";
    var searchText = this.state.searchText;
    var body = JSON.stringify({ searchText });
    console.log(JWT, searchText, body);
    this.setState({ isLoading: false }, () => {
      fetch(backendAPI + `/search/store`, {
        method: "POST",
            headers: {
              Authorization: JWT,
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: body
      }).then(res => res.json())
      .then(resJson => {
          this.setState({
            result: resJson.result
          })
      })
    });
  }

  componentWillReceiveProps(nextProps) {
    // Loads some users on initial load
    //console.log('location', nextProps.location)
    // try {
    //   this.props.location.state.setRedirect(false)
    // }
    // catch(err) {}
    const JWT = Cookie.get("JWT") ? Cookie.get("JWT") : "null";
    var searchText = nextProps.location.state.searchText;
    var body = JSON.stringify({ searchText });
    this.setState({ isLoading: false }, () => {
      fetch(backendAPI + `/search/store`, {
        method: "POST",
            headers: {
              Authorization: JWT,
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: body
      }).then(res => res.json())
      .then(resJson => {
          this.setState({
            result: resJson.result
          })
      })
    });
  }

  /*
  loadUsers = () => {
    const JWT = Cookie.get("JWT") ? Cookie.get("JWT") : "null";
    var searchText = this.state.searchText;
    var body = { searchText }
    console.log(JWT, searchText, body);
    this.setState({ isLoading: true }, () => {
      fetch(backendAPI + `/search/store`, {
        method: "POST",
            headers: {
              Authorization: JWT,
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: body
      }).then(res => {
        console.log(res);

      })
      /*
      .then(resJson => {
        console.log(resJson);
        this.setState({
          result: resJson.result
        })
      })*/
      /*
      axios
        .get("https://randomuser.me/api/?results=10")
        .then(results => {
          // Creates a massaged array of user data
        //   console.log(results.data)
          const nextUsers = results.data.results.map(user => ({
            email: user.email,
            name: Object.values(user.name).join(" "),
            photo: user.picture.medium,
            username: user.login.username,
            uuid: user.login.uuid
          }));

          // Merges the next users into our existing users
          this.setState({
            // Note: Depending on the API you're using, this value may be
            // returned as part of the payload to indicate that there is no
            // additional data to be loaded
            hasMore: this.state.users.length < 100,
            isLoading: false,
            users: [...this.state.users, ...nextUsers]
          });
        })
        .catch(err => {
          this.setState({
            error: err.message,
            isLoading: false
          });
        });
    });
  };*/

  render() {
    const { error, hasMore, isLoading, users, result } = this.state;

    return (
      <Container>
        <div>
          <Typography variant="h2">
            Infinite Music!
          </Typography>
          <Typography variant="h5"> Scroll down to load more!!</Typography>
          <Container maxWidth="md">
            {result.map((item, index) => (
              <ProductCard key={index} item={item} />
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
          {!hasMore && <div>You did it! You reached the end!</div>}
        </div>
      </Container>
    );
  }
}

export default withRouter(Search);