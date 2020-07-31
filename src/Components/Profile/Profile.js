import React from "react";
import Cookie from "js-cookie";
import { Button } from 'shards-react';
import { backendAPI } from "../../constants";
import PaymentHandler from '../PaymentHandler';
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import ProductCard from "../ProductCard/ProductCard";
import ProfileProduct from './ProfileProduct';
import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
//import MusicPlayer from '../MusicPlayer/MusicPlayer';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        error: false,
      hasMore: false,
      isLoading: false,
        user: {itemsPosted: [], studiosRented: [], instrumentsBought: []}
    };
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
          this.setState({ user:resJson });
        });
    });
  };
  render() {
    const JWT = Cookie.get("JWT") ? Cookie.get("JWT") : "null";
    const {error, isLoading, hasMore, user } = this.state;

    return (
      <React.Fragment>
            <center>
          <h2 className="bebas" style={{ textAlign: 'center', marginTop: 100 }}>
            Profile
          </h2>
          <img
            src={user.picture}
            className="shadow"
            style={{ height: 150, width: 150, borderRadius: 75 }}
          />
          <h4>Email: {user.email}</h4>
          <h4>Username: {user.username}</h4>
          <Divider />
          <h4>Items Posted</h4>
          <div>
          <Typography variant="h2">
          </Typography>
            <Container maxWidth="md">
            {user.itemsPosted.map((item, index) => (
              <ProfileProduct key={index} item={item} />
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
          <h4>Studios Rented</h4>
          <div>
          <Typography variant="h2">
          </Typography>
            <Container maxWidth="md">
            {user.studiosRented.map((item, index) => (
              <ProfileProduct key={index} item={item.studio} />
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
          <h4>Instruments Bought</h4>
          <div>
          <Typography variant="h2">
          </Typography>
            <Container maxWidth="md">
            {user.instrumentsBought.map((item, index) => (
              <ProfileProduct key={index} item={item.instrument} />
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
          <br />
          <Button outline pill onClick={(e) => PaymentHandler(e, 1500)}>Subscribe to CUATRO</Button>
          </center>
      </React.Fragment>
    );
  }
}
