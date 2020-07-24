import React, { useState } from "react";
import { withStyles, makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import DoneIcon from '@material-ui/icons/Done';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import InfoIcon from "@material-ui/icons/Info";
import EventIcon from '@material-ui/icons/Event';
import Tooltip from "@material-ui/core/Tooltip";
import { Calendar, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import { backendAPI } from "../../constants";
import Cookie from 'js-cookie';

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    margin: "1em 1em 1em 1em",
    justifyContent: "space-between"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 151
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  playIcon: {
    height: 38,
    width: 38
  },
  rootParent: {
    display: "inline-block"
  }
}));

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 400,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

export default function CartCard(props) { 
  const classes = useStyles();
  const theme = useTheme();
  const [myValues, setMyValues] = useState(props.item);
  const [selectedDate, setSelectedDate ] = useState(moment(new Date()));
  const product = myValues ? myValues.item : {}; 
  const date = moment(myValues ? myValues.date : moment()).format('DD-MM-YYYY');

  const handleMonthChange = (date) => {
    var today = moment(new Date());
    if (date._d > today) {
      setSelectedDate(date);
    }
    else {
      setSelectedDate(today);
    }
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  }

  const handleCartBuy = (item) => {
    const JWT = Cookie.get("JWT") ? Cookie.get("JWT") : "null";
      var itemID = item.item._id; 
      var body;
      if (item.item.type === 'Studio') {
        var date = moment(item.date).format('YYYY-MM-DD');
        body = JSON.stringify({ itemID, date });
        console.log(JWT, itemID, date, body);
        fetch(backendAPI + `/store/rent_studio`, {
            method: "POST",
            headers: {
              Authorization: JWT,
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: body
          }).then( res => res.json())
          .then(resJson => {
            console.log(resJson);
            setMyValues(null);
          })
      }
      else {
        body = JSON.stringify({ itemID });
        console.log(JWT, itemID, body);
        fetch(backendAPI + `/store/buy_instrument`, {
            method: "POST",
            headers: {
              Authorization: JWT,
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: body
          }).then( res => res.json())
          .then(resJson => {
            console.log(resJson);
            setMyValues(null);
          })
      }
  }

  const handleCartRemove = (item) => {
      const JWT = Cookie.get("JWT") ? Cookie.get("JWT") : "null";
      var itemID = item.item._id; 
      var body;
      if (item.item.type === 'Studio') {
        var date = moment(item.date).format('YYYY-MM-DD');
        body = JSON.stringify({ itemID, date });
        console.log(JWT, itemID, date, body);
      }
      else {
        body = JSON.stringify({ itemID });
        console.log(JWT, itemID, body);
      }
      fetch(backendAPI + `/cart/remove`, {
        method: "POST",
        headers: {
          Authorization: JWT,
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: body
      }).then( res => res.json())
      .then(resJson => {
        console.log(resJson);
        setMyValues(null);
      })
  }

  return (
    <div className={classes.rootParent}>
      {myValues ? (
      <Card className={classes.root}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h6" variant="h6">
              Item: {product.product}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Price: ₹{product.price}
            </Typography>
          </CardContent>
          <div className={classes.controls}>
          <HtmlTooltip title={<React.Fragment><Typography variant="caption" color="textSecondary">
              {product.type}<br />
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Description: {product.description}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Seller: {product.poster}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Date: {date}
            </Typography>
            </React.Fragment>}>
            <IconButton aria-label="info">
              <InfoIcon />
            </IconButton></HtmlTooltip>
            <IconButton onClick={() => handleCartBuy(myValues)} aria-label="add">
              <DoneIcon />
            </IconButton>
            <IconButton onClick={() => handleCartRemove(myValues)} aria-label="info">
              <RemoveCircleOutlineIcon />
            </IconButton>
          </div>
        </div>
        <CardMedia
          className={classes.cover}
          image={product.picture}
          title={product.product}
        />
      </Card>) : null}
    </div>
  );
}
