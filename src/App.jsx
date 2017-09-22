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
        const accessToken = 'BQADKOCGo9grFjqtyq7bHEQVcKtNgnrt9mZCCaJ3pft4WsF30T0usA_5Demqu7kGZFLOLP6qq0WnYDMPfV8RwdclwDrpNH108vBxNslG4nKSCJCA6ui23QQCHKxmVprJHkjgZmL4ywCm1eWIus810PhvCelpUQ&refresh_token=AQD7rS_qqq-Kg438Mdihv3rJT92qPsToupAHtiJYNUAVeX_exVp5oeORCQyGIjMF48WS-flMe1KtGLCRO8SvX9lrzXNmacCazRLmwUoa7UYsvCsQ8nWD32KtAdW98r8EszA';
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