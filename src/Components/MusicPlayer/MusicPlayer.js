import React from 'react';
//import ReactDOM from 'react-dom';
import axios from 'axios';
import { url } from '../../Config/config'
import './MusicPlayer.scss';
import Cookie from "js-cookie";
import { backendAPI } from "../../constants";
import { IconButton } from '@material-ui/core'
import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';
import SkipNextOutlinedIcon from '@material-ui/icons/SkipNextOutlined';
import SkipPreviousOutlinedIcon from '@material-ui/icons/SkipPreviousOutlined';
import PauseOutlinedIcon from '@material-ui/icons/PauseOutlined';
import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined';
import AddToPlaylist from './AddToPlaylist'

export default class CardProfile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            index: 0,
            currentTime: '0:00',
            musicList: [{name:'La vie en rose', author: 'Cristin Miloti', img: 'https://www.bensound.com/bensound-img/summer.jpg', audio:'https://drive.google.com/uc?export=download&id=1k0na9kj-53ndPpQ_1gOzMJe-_E44ttCd', duration: '1:50'}],
            pause: false,
            playlists: null,
            openPlaylistsDialog: false
          };
    }
  
   componentDidMount() {
    this.getAllPlaylist()
    if (this.props.playlist){
      this.setState({
        musicList: this.props.playlist.songs 
      })
    }
    else {
    fetch(backendAPI + `/music/songs`)
    .then(res => res.json())
    .then(resJson => {
      this.setState({
        musicList: resJson.musicList
      });
    });
    }
     this.playerRef.addEventListener("timeupdate", this.timeUpdate, false);
     this.playerRef.addEventListener("ended", this.nextSong, false);
     this.timelineRef.addEventListener("click", this.changeCurrentTime, false);
     this.timelineRef.addEventListener("mousemove", this.hoverTimeLine, false);
     this.timelineRef.addEventListener("mouseout", this.resetTimeLine, false);
   }
  
    componentWillUnmount() {
      this.playerRef.removeEventListener("timeupdate", this.timeUpdate);
      this.playerRef.removeEventListener("ended", this.nextSong);
      this.timelineRef.removeEventListener("click", this.changeCurrentTime);
      this.timelineRef.removeEventListener("mousemove", this.hoverTimeLine);
      this.timelineRef.removeEventListener("mouseout", this.resetTimeLine);
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
              playlists: res.data
          })
      })
      .catch(error => {
          this.setState({
              error: error
              
          })
      })
  }

  addToPlaylist = () => {
    this.setState({
      openPlaylistsDialog: true
    })
  }

  closePlaylistDialog = (value) => {
    this.setState({
      openPlaylistsDialog: false
    })
    if (value == null) {
      return
    }
    console.log(this.state.musicList[this.state.index], value)
    axios.post(`${url}/playlist/add`, {
      name: value,
      music: this.state.musicList[this.state.index]
    }, {
      headers: {
          Authorization: Cookie.get("JWT")
        }
    })
    .then(res => {
        console.log('success on adding to playlist', res.data)
    })
    .catch(error => {
        this.setState({
            error: error
            
        })
    })
  }
  
  changeCurrentTime = (e) => {
    const duration = this.playerRef.duration;
    
    const playheadWidth = this.timelineRef.offsetWidth;
    const offsetWidht = this.timelineRef.offsetLeft;
    const userClickWidht = e.clientX - offsetWidht;
   
    const userClickWidhtInPercent = (userClickWidht*100)/playheadWidth;
  
    this.playheadRef.style.width = userClickWidhtInPercent + "%";
    this.playerRef.currentTime = (duration * userClickWidhtInPercent)/100;
  }
  
  hoverTimeLine = (e) => {
    const duration = this.playerRef.duration;
    
    const playheadWidth = this.timelineRef.offsetWidth
    
    const offsetWidht = this.timelineRef.offsetLeft;
    const userClickWidht = e.clientX - offsetWidht;
    const userClickWidhtInPercent = (userClickWidht*100)/playheadWidth;
  
    if(userClickWidhtInPercent <= 100){
      this.hoverPlayheadRef.style.width = userClickWidhtInPercent + "%";
    }
    
    const time = (duration * userClickWidhtInPercent)/100;
    
    if( (time >=0) && (time <= duration)){
      this.hoverPlayheadRef.dataset.content = this.formatTime(time);
    }
  }
  
  resetTimeLine = () => {
    this.hoverPlayheadRef.style.width = 0;
  }
  
  timeUpdate = () => {
    const duration = this.playerRef.duration;
    const timelineWidth = this.timelineRef.offsetWidth - this.playheadRef.offsetWidth;
    const playPercent = 100 * (this.playerRef.currentTime / duration);
      this.playheadRef.style.width = playPercent + "%";
    const currentTime = this.formatTime(parseInt(this.playerRef.currentTime));  
    this.setState({ 
      currentTime 
    });
  }
  
  formatTime = (currentTime) =>{
    const minutes = Math.floor(currentTime / 60);
    let seconds = Math.floor(currentTime % 60);
  
    seconds = (seconds >= 10) ? seconds : "0" + seconds % 60;
    
    const formatTime = minutes + ":" +  seconds
   
    return formatTime;
    }
  
    updatePlayer = () =>{
      const { musicList, index } = this.state;
      const currentSong = musicList[index];
      const audio = new Audio(currentSong.audio);
      this.playerRef.load();
    }
    
    nextSong = () => {
      const { musicList, index, pause } = this.state;
    
      this.setState({ 
        index: (index + 1) % musicList.length
      });
      this.updatePlayer();
      var audio = this.playerRef;
      if(pause){
        setTimeout(() => {
          this.playerRef.play();}, 50);
      }
    };
  
    prevSong = () => {
      const { musicList, index, pause } = this.state;  
      
      this.setState({ 
        index: (index + musicList.length - 1) % musicList.length
      });
      this.updatePlayer();
      if(pause){
        setTimeout(() => {
          this.playerRef.play();}, 50);
      }
    };
     
  
    playOrPause = () =>{
      const { musicList, index, pause } = this.state;
      const currentSong = musicList[index];
      const audio = new Audio(currentSong.audio);
      if( !this.state.pause ){
        this.playerRef.play();
      }else{
        this.playerRef.pause();
      }
      this.setState({
        pause: !pause
      })
    }
    
    clickAudio = (key) =>{
      const { pause } = this.state;
      
      this.setState({
        index: key
      });
      
      this.updatePlayer();
      if(pause){
        this.playerRef.play();
      }
    }
  
    
    render() {
      const JWT = Cookie.get("JWT") ? Cookie.get("JWT") : "null";
      const { musicList, index, currentTime, pause } = this.state;
      const currentSong = musicList[index];
      return (
        <center>
        {
          this.state.openPlaylistsDialog ? (
            <AddToPlaylist
              selectedValue={null}
              open={this.state.openPlaylistsDialog}
              onClose={this.closePlaylistDialog}
              playlists={this.state.playlists}
            />
          ) : null
        }
        
        <div className="card">
          <div className="current-song">
            <audio ref={ref => this.playerRef = ref}>
              <source src={ currentSong.audio } type="audio/ogg"/>
                Your browser does not support the audio element.
            </audio>
            <div className="img-wrap">
              <img src={ currentSong.img }/>
             </div>
            <span className="song-name">{ currentSong.name }</span>
            <span className="song-autor">{ currentSong.artists }</span>
            
            <div className="time">
              <div className="current-time">{ currentTime }</div>
              <div className="end-time">{ currentSong.duration }</div>
            </div>
            
            <div ref={ref => this.timelineRef = ref} id="timeline">
              <div ref={ref => this.playheadRef = ref} id="playhead"></div>
              <div ref={ref => this.hoverPlayheadRef = ref} className="hover-playhead" data-content="0:00"></div>
            </div>
            
            <div className="controls">

              <IconButton onClick={this.prevSong}>
                <SkipPreviousOutlinedIcon />
              </IconButton>
              
              <IconButton onClick={this.playOrPause}>
                {!pause ? <PlayArrowOutlinedIcon />: <PauseOutlinedIcon />}
              </IconButton>

              <IconButton onClick={this.addToPlaylist}>
                <PlaylistAddOutlinedIcon />
              </IconButton>

              <IconButton onClick={this.nextSong}>
                <SkipNextOutlinedIcon />
              </IconButton>
            </div>
            
          </div>
          <div className="play-list" >
            {musicList.map( (music, key=0) =>
                           <div key={key} 
                             onClick={()=>this.clickAudio(key)}
                             className={"track " + 
                               (index === key && !pause ?'current-audio':'') + 
                               (index === key && pause ?'play-now':'')} >
                             
                             <img className="track-img" src={music.img}/>
                             <div className="track-discr" >
                               <span className="track-name" >{music.name}</span>
                               <span className="track-author" >{music.artists}</span>
                             </div>
                             <span className="track-duration" >
                               {(index === key)
                                 ?currentTime
                                 :music.duration
                               }
                             </span>
                           </div>
                          )}
          </div>
        </div>
        </center>
      )
    }
  }