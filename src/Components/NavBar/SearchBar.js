import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { Redirect } from 'react-router'


const useStyles = makeStyles((theme) => ({
  root: {
      marginTop: "0.75rem" 
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.primary.main, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchBar() {
  const classes = useStyles();
  const search = () => {
      return
  }
  const [query, setQuery] = useState("")
  const [redirect, setRedirect] = useState(false)
  const keyPress = (event) => {
    if (event.keyCode == 13) {
      console.log("query", query)
      setRedirect(true)
    }
  }
  return (
    <div className={classes.root}>
        {redirect ? (
          <Redirect to={{
            pathname: "/search",
            state: { 
              searchText: query,
            }
          }}/>
        ): null}
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <IconButton type="submit" aria-label="search" onClick={search}>
                    <SearchIcon />
                </IconButton>
            </div>
            <InputBase
                placeholder="Search…"
                classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
                }}
                onChange={event => setQuery(event.target.value)}
                onKeyDown={keyPress}
                inputProps={{ 'aria-label': 'search' }}
            />
        </div>
    </div>
  );
}
