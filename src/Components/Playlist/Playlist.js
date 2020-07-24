import React from 'react';
import Cookie from "js-cookie";
import axios from 'axios';
import { Button, Container, Fab, IconButton, TextField, Tooltip, Typography } from '@material-ui/core'
import PlaylistBar from './PlaylistBar'
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { url } from '../../Config/config'

export default class Playlist extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newPlaylistCreation: false,
            playlistDetails: {},
            loading: true,
            playlists: null
        }
    }

    componentDidMount = () => {
        this.getAllPlaylist()
    }

    getAllPlaylist = () => {
        axios.post(`${url}/playlist/getall`, {}, {
            headers: {
                Authorization: Cookie.get("JWT")
            }
        })
        .then(res => {
            console.log('success', res.data)
            this.setState({
                loading: false,
                playlists: res.data
            })
        })
        .catch(error => {
            this.setState({
                error: error
                
            })
        })
    }

    openNameEditor = () => {
        this.setState({
            newPlaylistCreation: true
        })
    }

    handleChange = (event) => {
        event.persist();
        this.setState(prevState => ({
            playlistDetails: {
                ...prevState.playlistDetails,
                [event.target.id]: event.target.value
            }
        }), () => {
            console.log(this.state.playlistDetails)
        })
    }

    close = () => {
        this.setState({
            newPlaylistCreation: false
        })
    }

    createPlaylist = () => {
        axios.post(`${url}/playlist/new`, this.state.playlistDetails, {
            headers: {
                Authorization: Cookie.get("JWT")
            }
        })
        .then(res => {
            console.log('success')
        })
        .catch(error => {
            this.setState({
                error: error
                
            })
        })
    }

    render() {
        const playlistRows = []
        for (var index in this.state.playlists) {
            playlistRows.push(<PlaylistBar key={index} name={this["state"]["playlists"][index]["name"]}/>)
        }
        return (
            <Container maxwidth="sm" style={{paddingTop: '2rem'}}>

                {this.state.playlists ? (
                    playlistRows
                ) : <Typography variant='h4' style={{marginTop: '2rem'}}>No playlist found</Typography>}
                
                {this.state.newPlaylistCreation ? (
                    <div>
                    <TextField id="name" label="Playlist Name" variant="outlined" style={{marginTop: '2em', marginRight:'2em', width:'80%'}} onChange={this.handleChange}/>
                    <IconButton style={{marginTop:'2rem'}} color="primary" onClick={this.createPlaylist}>
                        <AddIcon />
                    </IconButton>
                    <IconButton style={{marginTop:'2rem'}} color="secondary" onClick={this.close}>
                        <DeleteIcon />
                    </IconButton>
                    </div>
                    ) : null}
                
                <Tooltip title="Add" placement="bottom-end" style={{marginTop: '2rem'}} onClick={this.openNameEditor}>
                    <Fab color="primary">
                        <PlaylistAddIcon />
                    </Fab>
                </Tooltip>
                
            </Container>
        )
    }
}