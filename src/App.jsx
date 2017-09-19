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
        console.log('this.state', this.state);
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
        const ALBUM_URL = 'https://api.spotify.com/v1/artists/';

        console.log("FETCH_URL", FETCH_URL);
        const accessToken = 'BQByVtetk2xL7hihjxoMwuZtNYK2_2fbyfZzAA0U3zELWJqutIOoY3-5eMz2Emuw5SHUeFmIVRrhD6Llj8YYEaCiXemCOBkBD9f7THQ6uFaFwd2jSrPSRa0EXmflaMY36UdmAGX5BLjqNk47708mKEOwcXn0YQ&refresh_token=AQAxFRfGUNAXV0Y6nkxRRRuOwIHU6pkWoU9iAayoWls1XAA-9Ds2fkcFFQjejYNMu3toxGpv_D8OT4jFOUOJc8wQjEgoiU7_2SGSG_V4nfY8G5zYCV7mdyoMHTQGahp6Uh0';
        fetch(FETCH_URL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(response => response.json())
        .then(json => {
            const artist = json.artists.items[0];
            console.log('artist', artist);
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
                console.log(json);
                const { tracks } = json;
                this.setState({ tracks })
            })

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