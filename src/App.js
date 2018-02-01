import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
let defaultTextColor = '#FFF';
let defaultStyle = {
    color: defaultTextColor
};
// let fakeSer = {
//   user: {
//     name: 'Jaime',
//     playlists: [
//       {
//         name: 'Favs',
//         songs: [
//           {
//             name: 'Inspire The Liars',
//             duration: 1234
//           },
//           {
//             name: 'Pomegranete',
//             duration: 234
//           },
//           {
//             name: 'Sweater Weather',
//             duration: 120
//           }
//         ]
//       }
//     ]
//   }
// };

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
        <h2>{Math.round(totalDuration/3600)} hours</h2>
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
          'verticalAlign': 'middle'
        }
      }>
        <img src={playlist.imageUrl} style={
          {
            'height': '64px',
            'marginTop': '5px'
          }
        }/>

        <h3 style={
          {
            'textAlign':'center'
          }
        }>{playlist.name}</h3>

        <ul style={
          {
            'margin': '10px'
          }
        }>
          {playlist.songs.map(song =>
            <li style={
              {
                'textAlign':'center',
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
      headers: {
        'Authorization' : 'Bearer ' + parsed
      }
    }).then(response => response.json()).then(data => this.setState({
      playlists: data.items.map(item => {
        return {
          name: item.name,
          imageUrl: item.images[0].url,
          songs: []
        }
      })
    }))
  };
  render() {
    let playlistsToRender = this.state.user &&
    this.state.playlists
    ? this.state.playlists.filter(playlist =>
      playlist.name.toLowerCase().includes(
        this.state.filterString.toLowerCase()))
    : []
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
              {this.state.user.name}s Playlist
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
              : 'http://nu-playlists-backend.herokuapp.com'}}
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
