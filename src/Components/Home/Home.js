import React from "react";
import Cookie from "js-cookie";
import { Button } from 'shards-react';
import { backendAPI } from "../../constants";
import PaymentHandler from '../PaymentHandler';
//import MusicPlayer from '../MusicPlayer/MusicPlayer';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {
    const JWT = Cookie.get("JWT") ? Cookie.get("JWT") : "null";
    fetch(backendAPI + "/users", {
      method: "GET",
      headers: {
        Authorization: JWT,
      },
    }).then((res) => {
      if (res.status === 401) {
        this.setState({ error: true });
      } else
        res.json().then((resJson) => {
          this.setState({ email: resJson.email, picture: resJson.picture, username: resJson.username });
        });
    });
  };
  render() {
    const JWT = Cookie.get("JWT") ? Cookie.get("JWT") : "null";

    return (
      <React.Fragment>
        <center>
          <h2 className="bebas" style={{ marginTop: 100 }}>
            Welcome Home!
          </h2>
          <img
            src={this.state.picture}
            className="shadow"
            style={{ height: 150, width: 150, borderRadius: 75 }}
          />
          <h4>Email: {this.state.email}</h4>
          <h4>Username: {this.state.username}</h4>
          <Button outline pill onClick={(e) => PaymentHandler(e, 750)}>Subscribe to CUATRO</Button>
        </center>
      </React.Fragment>
    );
  }
}
