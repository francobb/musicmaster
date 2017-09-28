import React from 'react';
import sinon from 'sinon';
import Gallery from '../App';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';

const buildComponent = (renderType = shallow, newProps = {},  newState = {}) => {

    const defaultProps = {
      tracks: []
    };

    const defaultState = {
        playingUrl: '',
        audio: null,
        playing: false,
        artist: ''
    };

    const props = Object.assign(defaultProps, newProps);
    const AppState = Object.assign(defaultState, newState);

    const component = renderType(<Gallery {...props}/>);

    component.setState({
        playingUrl: AppState.playingUrl,
        audio: AppState.audio,
        playing: AppState.playing,
        artist: AppState.artist
    });

    component.update();

    return component;
};

describe('Gallery Unit Tests', () => {

    describe('<Gallery /> rendering without data', () => {
        // shouldn't render shit'
        it('')
    });

    describe('<Gallery /> rendering', () => {

        let app;
        let newState;
        let audioMock;
        const tracks = {tracks: [
            {
                id: "4JehYebiI9JE8sR8MisGVb",
                name: "Halo",
                popularity: 80,
                preview_url: "https://p.scdn.co/mp3-preview/3c97985f3736fab6d4abcd2067f346a9b30955fa?cid=b8b787dc817242eeaf9ff00df904ab5f",
                track_number: 2,
                type: "track",
                uri: "spotify:track:4JehYebiI9JE8sR8MisGVb",
                album: {
                    images: [
                        {
                            height: 640,
                            url: "https://i.scdn.co/image/272c8679a23e1c92b17c176f5470e9c2eca3e4bc",
                            width: 640
                        }
                    ]
                }
            },
            {
                album: {
                    images: [
                        {
                            height: 640,
                            url: "https://i.scdn.co/image/272c8679a23e1c92b17c176f5470e9c2eca3e4bc",
                            width: 640
                        }
                    ]
                },
                artists: [],
                available_markets: [],
                disc_number: 1,
                duration_ms: 261640,
                explicit: false,
                href: "https://api.spotify.com/v1/tracks/4JehYebiI9JE8sR8MisGVb",
                id: "4JehYebiI9JE8sR8MisGVb",
                name: "Halo",
                popularity: 80,
                preview_url: "https://p.scdn.co/mp3-preview/3c97985f3736fab6d4abcd2067f346a9b30955fa?cid=b8b787dc817242eeaf9ff00df904ab5f",
                track_number: 2,
                type: "track",
                uri: "spotify:track:4JehYebiI9JE8sR8MisGVb"
            }
        ]};
        const artistMock = {
            followers: {},
            genres: [],
            href:"https://api.spotify.com/v1/artists/6vWDO969PvNqNYHIOW5v0m",
            id:"6vWDO969PvNqNYHIOW5v0m",
            images: [{
                height: 1000,
                url: "https://i.scdn.co/image/673cd94546df0536954198867516fee18cee1605",
                width: 1000,
            }],
            name:"Beyoncé",
            popularity:89,
            type:"artist",
            uri:"spotify:artist:6vWDO969PvNqNYHIOW5v0m"
        };

        beforeEach(() => {
            newState = {
                playingUrl: tracks.tracks[0].playingUrl,
                playing: true,
                audio: audioMock,
                artist: artistMock
            };
            app = buildComponent(mount, tracks, newState);
        });

        it('should render a <Gallery /> element on change of state', () => {
            expect(app.find('Gallery')).to.have.length(1);
        });

        it('should have updated default props to include tracks', () => {
            // console.log(app.instance().props);
            expect(app.instance().props.tracks).to.eql(tracks.tracks);
        });

    });

});