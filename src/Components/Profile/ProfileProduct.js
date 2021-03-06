import React, { useState } from "react";
import { withStyles, makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import InfoIcon from "@material-ui/icons/Info";
import EventIcon from '@material-ui/icons/Event';
import Tooltip from "@material-ui/core/Tooltip";
import { Calendar, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import { backendAPI } from "../../constants";
import Cookie from 'js-cookie';
import Alert from '../Alert/Alert';

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    width: '20rem',
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

export default function ProfileProduct({ item }) {
  const classes = useStyles();
  const theme = useTheme();
  const [selectedDate, setSelectedDate ] = useState(moment(new Date()));
  const [success, setSuccess ] = useState(false);

  return (
    <div className={classes.rootParent}>
      <Card className={classes.root}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h6" variant="h6">
              Item: {item.product}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Price: ₹{item.price}
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <HtmlTooltip title={<React.Fragment><Typography variant="caption" color="textSecondary">
              {item.type}<br />
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Description: {item.description}
            </Typography>
            </React.Fragment>}>
            <IconButton aria-label="info">
              <InfoIcon />
            </IconButton></HtmlTooltip>
          </div>
        </div>
        <CardMedia
          className={classes.cover}
          image={item.picture}
          title={item.product}
        />
      </Card>
    </div>
  );
}
