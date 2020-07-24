import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import MusicPlayer from '../MusicPlayer/MusicPlayer';


const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));


export default function PlaylistBar(props) {
  const classes = useStyles();
  const [ showPlayer, setPlayer ] = useState(false);
  const music = props;
  console.log("Music", music);

  const handleClick = () => {
    setPlayer(true);
  }

  const handleClose = () => {
    setPlayer(false);
  }

  return (
    <div className={classes.root}>
      {!showPlayer ? (<List component="nav" aria-label="playlist">
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <QueueMusicIcon color='primary'/>
          </ListItemIcon>
          <ListItemText primary={props.name} />
        </ListItem>
      </List>) : 
          <React.Fragment><List component="nav" aria-label="playlist">
          <ListItem button onClick={handleClose}>
            <ListItemIcon>
              <QueueMusicIcon color='primary'/>
            </ListItemIcon>
            <ListItemText primary={props.name} />
          </ListItem>
        </List> <MusicPlayer playlist={music}/></React.Fragment>}
    </div>
  );
}
