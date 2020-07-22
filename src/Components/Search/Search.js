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

class Search extends Component {
  constructor(props) {
    super(props);

    // Sets up our initial state
    this.state = {
      error: false,
      hasMore: true,
      isLoading: false,
      searchText: this.props.location ? this.props.location.state.searchText : "",
      users: []
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
    this.loadUsers();
  }

  loadUsers = () => {
    this.setState({ isLoading: true }, () => {
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
  };

  render() {
    const { error, hasMore, isLoading, users } = this.state;

    return (
      <Container>
        <div>
          <Typography variant="h2">
            Infinite Music!
          </Typography>
          <Typography variant="h5"> Scroll down to load more!!</Typography>
          <Container maxWidth="md">
            {users.map((user, index) => (
              <ProductCard key={index} user={user} />
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