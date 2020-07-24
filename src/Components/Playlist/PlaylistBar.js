import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));


export default function PlaylistBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="playlist">
        <ListItem button>
          <ListItemIcon>
            <QueueMusicIcon color='primary'/>
          </ListItemIcon>
          <ListItemText primary={props.name} />
        </ListItem>
      </List>
    </div>
  );
}
