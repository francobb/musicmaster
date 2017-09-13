import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';
class App extends Component {
    constructor(props){
        super(props);
        this.state = {
          query: '',
          artist: null
        };
    }

    search() {
        console.log('this.state', this.state);
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        const FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
        console.log("FETCH_URL", FETCH_URL);
        fetch(FETCH_URL, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer BQCZqL0YSgdW2s2VeBe6jbcf7s2rpr3RkqpSMXLv_lewZRYFXfHo2g6LWsH3WNWDBsm_WNctP3fpEHcOg7UrPgG9ampT5tszaDgeUxcgdzIKGVmEvqT1UlIg_i2mD21iT3D5MhayWw'
            }
        })
        .then(response => response.json())
        .then(json => {
            const artist = json.artists.items[0];
            console.log('artist', artist);
            this.setState({artist});
        });
    }

    render() {
        return (
          <div className="App">
              <div className="App-title">Music Master</div>
              <FormGroup>
                  <InputGroup>
                      <FormControl
                          type="text"
                          placeholder="Search for an Artist"
                          value={this.state.query}
                          onChange={event => {this.setState({query: event.target.value})}}
                          onKeyPress={event => {
                              if (event.key === 'Enter') {
                                  this.search()
                              }
                          }}
                      />
                      <InputGroup.Addon onClick={() => {this.search()}}>
                          <Glyphicon glyph="search"> </Glyphicon>
                      </InputGroup.Addon>
                  </InputGroup>
              </FormGroup>
             <Profile
                 artist={this.state.artist}
             />
              <div className="Gallery">
                  Gallery
              </div>
          </div>
        )
    }
}

export default App;