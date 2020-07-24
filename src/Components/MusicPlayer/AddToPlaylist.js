import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import AddIcon from "@material-ui/icons/Add";
import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  }
});

export default function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open, playlists } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = value => {
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="title"
      open={open}
    >
      <DialogTitle id="title">Select Playlist</DialogTitle>
      <List>
        {playlists.map(playlist => (
          <ListItem
            button
            onClick={() => handleListItemClick(playlist.name)}
            key={playlist.name}
          >
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PlaylistAddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={playlist.name} />
          </ListItem>
        ))}

      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired
};
