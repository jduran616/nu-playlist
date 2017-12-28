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
        songs [
          {
            name: 'Inspire The Liars',
            duration: 1234
          },
          {
            name: 'Pomegranete'
            duration: 234
          },
          {
            name:'Sweater Weather'
            duration: 120
          }]
      },
      {
        name: '2nd Favs',
        songs [
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
        songs [
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
        songs [
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
    let allSongs = this.props.playlists.reduce((songs, eachPlaylists) => {
      return songs.concat(eachPlaylists.songs)
    }, [])
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration
    }, 0)
    return (
      <div style={{...defaultStyle, width: "40%", display: 'inline-block'}}>
        <h2>{Math.round(totalDuration/60)} hours</h2>
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
      <div style={{...defaultStyle, width: '25%', display: 'inline-block'}}>
        <img />
        <h3>Playlist Name</h3>
        <ul><li>Song 1</li><li>Song 2</li><li>Song 3</li></ul>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {serverData: {}}
  }
  componentDidMount() {
    setTimeOut(() => {
    this.setState({serverData: fakeSer});
  }, 1000);
  }
  render() {
    return (
      <div className="App">
        {this.setState.serverData.user ?
          <div>
            <h1 style={...defaultStyle, 'font-size': '54px'}}>
              {this.stat.serverData.user.name}'s Playlist
            </h1>}
            <PlaylistCounter playlists={this.stat.serverData.user.playlists}/>
            <HoursCounter/>
            <Filter/>
            <Playlist/>
            <Playlist/>
            <Playlist/>
          </div> : <h1 style={defaultStyle}>'Loading...'</h1>
        }
      </div>
    );
  }
}

export default App;
