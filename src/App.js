import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
let defaultTextColor = '#FFF';
let defaultStyle = {
    color: defaultTextColor
};
let fakeSer = {
  user: {
    name: 'Jaime',
    playlists: [
      {
        name: 'Favs',
        songs: [
          {
            name: 'Inspire The Liars',
            duration: 1234
          },
          {
            name: 'Pomegranete',
            duration: 234
          },
          {
            name: 'Sweater Weather',
            duration: 120
          }]
      },
      {
        name: '2nd Favs',
        songs: [
          {
            name: 'The Robot With Human Hair Pt. 4',
            duration: 321
          },
          {
            name: 'By Design',
            duration: 876
          },
          {
            name: 'Shout',
            duration: 2354
          }
        ]
      },
      {
        name: '3rd Favs',
        songs: [
          {
            name: 'Crazy',
            duration: 567
          },
          {
            name: 'Aint It Fun',
            duration: 2345
          },
          {
            name: 'IceBox',
            duration: 876
          }
        ]
      },
      {
        name: '4th Favs',
        songs: [
          {
            name: 'Alex English',
            duration: 854
          },
          {
            name: 'Carl Baker',
            duration: 777
          },
          {
            name: 'Stroke God, Millionaire',
            duration: 666
          }
        ]
      }
    ]
  }
};

class PlaylistCounter extends Component {
  render() {
    return (
      <div style={{...defaultStyle, width: "40%", display: 'inline-block'}}>
        <h2>{this.props.playlists.length} Playlists</h2>
      </div>
    );
  }
}

class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    }, [])

    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return (sum + eachSong.duration)
    }, 0)

    return (
      <div style={{...defaultStyle, width: "40%", display: 'inline-block'}}>
        <h2>{Math.round(totalDuration/3600)} hours</h2>
      </div>
    );
  }
}

class Filter extends Component {
  render() {
    return(
      <div style={{...defaultStyle}}>
        <img/>
        <input type="text"/>
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    return(
      <div style={{...defaultStyle, width: '23%', display: 'inline-block'}}>
        <img />
        <h3>{this.props.playlist.name}</h3>
        <ul>
          {this.props.playlist.songs.map(song =>
            <li style={{'text-align':'left', 'list-style':'numbered'}}>{song.name}</li>
          )}
        </ul>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {serverData: {}}
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({serverData: fakeSer});
    }, 1000);
  };
  render() {
    return (
      <div className="App">
        {this.state.serverData.user ?
          <div>
            <h1 style={{...defaultStyle, 'font-size': '54px'}}>
              {this.state.serverData.user.name}s Playlist
            </h1>
            <PlaylistCounter playlists={this.state.serverData.user.playlists}/>
            <HoursCounter playlists={this.state.serverData.user.playlists}/>
            <Filter/>
            {this.state.serverData.user.playlists.map(playlist =>
              <Playlist playlist={playlist}/>
            )}
          </div> : <h1 style={defaultStyle}>'Loading...'</h1>
        }
      </div>
    );
  }
}

export default App;
