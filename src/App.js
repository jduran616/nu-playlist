import React, { Component } from 'react';
import './App.css';
let defaultTextColor = '#FFF';
let defaultStyle = {
    color: defaultTextColor
};

class PlaylistCounter extends Component {
  render() {
    return (
      <div style={
        {...defaultStyle,
          'width': '40%',
          'display': 'inline-block'
        }
      }>
        <h2>{this.props.playlists.length} Playlists</h2>
      </div>
    );
  }
}

class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    }, []);

    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return (sum + eachSong.duration)
    }, 0);

    return (
      <div style={
        {
          ...defaultStyle,
          'width': '40%',
          'display': 'inline-block'
        }
      }>
        <h2>{Math.round(totalDuration/60)} minutes</h2>
      </div>
    );
  }
}

class Filter extends Component {
  render() {
    return(
      <div style={
        {
          ...defaultStyle,
          'padding': '20px',
          'margin': '5px'
        }
      }>
        <input type="text" onKeyUp={event => this.props.onTextChange(event.target.value)}/>
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist;
    return(
      <div style={
        {...defaultStyle,
          'width': '23%',
          'display': 'inline-block',
          'padding': '5px',
          'verticalAlign': 'middle',
          'min-height': '320px'
        }
      }>
        <img src={playlist.imageUrl} style={
          {
            'height': '150px',
            'marginTop': '5px'
          }
        }/>

        <h3 style={
          {
            'textAlign':'center'
          }
        }>{playlist.name.slice(0,20) + '...'}</h3>

        <ul style={
          {
            'margin': '10px'
          }
        }>
          {playlist.songs.map(song =>
            <li style={
              {
                'textAlign':'left',
                'listStyle':'none',
                'paddingTop': '10px'
              }
            }>{song.name}</li>
          )}
        </ul>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      filterString: ''
    }
  };
  componentDidMount() {
    let parsed = new URLSearchParams(window.location.search).get('access_token');

    if(!parsed)
      return;

    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization' : 'Bearer ' + parsed}
    }).then(response => response.json())
    .then(data => this.setState({
      user: {
        name: data.display_name
      }
    }));

    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {'Authorization' : 'Bearer ' + parsed}
    }).then(response => response.json())
      .then(playlistData => {
        const playlists = playlistData.items
        const trackDataPromises = playlists.map( playlist => {
          const responsePromise = fetch(playlist.tracks.href, {
            headers: {'Authorization' : 'Bearer ' + parsed}
          })
          const trackDataPromise = responsePromise
          .then(response => response.json())
          return trackDataPromise
        })
        const allTracksDataPromise = Promise.all(trackDataPromises)
          const playlistsPromise = allTracksDataPromise.then(trackDatas => {
            trackDatas.forEach((trackData, i) => {
              playlists[i].trackDatas = trackData.items.map(item => item.track)
                .map(trackData => ({
                  name: trackData.name,
                  duration: trackData.duration_ms/ 1000
                }))
          })
          return playlists
        })
        return playlistsPromise
      })
      .then(playlists => this.setState({
      playlists: playlists.map(item => {
        console.log(item.trackDatas)
        return {
          name: item.name,
          imageUrl: item.images[0].url,
          songs: item.trackDatas.slice(0,3)
        }
      })
    }))
  };
  render() {
    let playlistsToRender = this.state.user && this.state.playlists
    ? this.state.playlists.filter(playlist => {
      let matchedPlaylist = playlist.name.toLowerCase().includes(
        this.state.filterString.toLowerCase())
      let matchedSong = playlist.songs.find(song =>
        song.name.toLowerCase().includes(this.state.filterString.toLowerCase()))
      return matchedPlaylist || matchedSong
    }) : []
    return (
      <div className="App">
        {this.state.user ?
          <div>
            <h1 style={
              {
                ...defaultStyle,
                'fontSize': '54px'
              }
            }>
              {this.state.user.name}'s Playlist
            </h1>
              <PlaylistCounter playlists={playlistsToRender}/>

              <HoursCounter playlists={playlistsToRender}/>

              <Filter onTextChange={text => this.setState({filterString: text})}/>

              {playlistsToRender.map(playlist => <Playlist playlist={playlist}/>)}

          </div> : <div style={
            {
              'minHeight': '100vh',
              'background' : 'linear-gradient(135deg, rgb(113,23,234) 0%, rgb(234,96,96) 100%)',
              'display': 'flex',
              'alignItems': 'center',
              'justifyContent':'center'}
            }>
            <button onClick={() => {window.location = window.location.href.includes('localhost')
              ? 'http://localhost:8888/login'
              : 'http://nu-playlist-backend.herokuapp.com/login'}}
            style={
              {
                'fontSize': '20px',
                'padding': '20px',
                'background': 'transparent',
                'border': 'none',
                'borderBottom' : '2px solid',
                'cursor': 'pointer'}
            }>Sign In With Spotify</button></div>
        }
      </div>
    );
  }
}

export default App;
