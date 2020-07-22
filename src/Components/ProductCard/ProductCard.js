import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import InfoIcon from "@material-ui/icons/Info";
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

export default function ProductCard({ user }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.rootParent}>
      <Card className={classes.root}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {user.username}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {user.email}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {user.name}
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <IconButton aria-label="add">
              <AddShoppingCartIcon />
            </IconButton>
            <IconButton aria-label="info">
              <InfoIcon />
            </IconButton>
          </div>
        </div>
        <CardMedia
          className={classes.cover}
          image={user.photo}
          title={user.username}
        />
      </Card>
    </div>
  );
}