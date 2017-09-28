import React, { Component } from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';
class App extends Component {
    constructor(props){
        super(props);
        this.state = {
          query: '',
          artist: null,
          tracks: []
        };
    }

    search() {
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
        const ALBUM_URL = 'https://api.spotify.com/v1/artists/';

        const accessToken = 'BQBJAeWUODhe6oti6VeehNKruSu4r5J08VIRq0S9LJAsmmzgr1R9S7Ty79YCq_2G4iz2nCJO_f7U8MExKk7cw75qoLyCavYmcpcYS9U1-MztXH1KH4pXBmA-kD1oOEqVyiLs5X-Cz_rpEF2rUUaNFk-QBYvaNQ&refresh_token=AQDVSXY7QAnYdy5y3m1NW_dDrODKQyQk_vYeJruhXo9Ak6dITd-3d3OO3WxNFZLcZDLHy4g7ll14wq9cGRkFy1lWDRc0T383r3bznV6dE0TcKCivwnph0gNKVpH6-VOjxi8';
        fetch(FETCH_URL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(response => response.json())
        .then(json => {
            const artist = json.artists.items[0];
          this.setState({artist});

            FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`;

          fetch(FETCH_URL, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            .then(res => res.json())
            .then(json => {

              const { tracks } = json;
                this.setState({ tracks });


            });
        });
    }

    render() {
        return (
          <div className="App">
              <div className="App-title">Music Master</div>
              <FormGroup>
                  <InputGroup>
                      <FormControl
                          className="form-control-element"
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
                      <InputGroup.Addon className='input-group-addon' onClick={() => {this.search()}}>
                          <Glyphicon glyph="search"> </Glyphicon>
                      </InputGroup.Addon>
                  </InputGroup>
              </FormGroup>
              {
                  this.state.artist !== null
                     ?
                      <div>
                          <Profile
                              artist={this.state.artist}
                          />
                          <Gallery
                              className="Gallery"
                              tracks={this.state.tracks}
                          />
                      </div>
                    :
                      <div> </div>
              }
          </div>
        )
    }
}

export default App;