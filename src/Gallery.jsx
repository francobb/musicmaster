import React, { Component } from 'react';
import './App.css';

class Gallery extends Component {
    constructor(props){
        super(props);
        this.state = {
            playingUrl: '',
            audio: null,
            playing: false
        }
    }

    playTrack(url){
        let audio = new Audio(url);
        if (!this.state.playing){
            audio.play();
            this.setState({
                playing: true,
                playingUrl: url,
                audio
            })
        } else {
            if (this.state.playingUrl === url ){
                this.state.audio.pause();
                this.setState({
                    playing: false
                })
            } else {
                this.state.audio.pause();
                audio.play();
                this.setState({
                    playing: true,
                    playingUrl: url,
                    audio
                })
            }
        }
    }

    render(){
        let tracks;

        if (this.props.tracks !== null) {
          tracks  = this.props.tracks;
        }

        return(
            <div>
              {
                this.props.tracks !== undefined
                      ?
                      <div>
                        { tracks.map((track, k) => {
                          const trackImg = track.album.images[0].url;
                          return(
                              <div
                                  key={k}
                                  className="track"
                              >
                                  <img
                                      src={trackImg}
                                      className="track-img"
                                      alt="track"
                                  />

                                  <div className="track-play"
                                       onClick={() => this.playTrack(track.preview_url)}
                                  >
                                      <div className="track-play-inner">
                                        {
                                          this.state.playingUrl === track.preview_url
                                              ? <span> | | </span>
                                              : <span> &#9654; </span>
                                        }
                                      </div>
                                  </div>
                                  <p className="track-text">
                                    {track.name}
                                  </p>
                              </div>
                          )
                        })}
                      </div>

                      :

                      <div> </div>
              }
            </div>
        )
    }
}

export default Gallery;