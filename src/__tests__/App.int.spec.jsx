import React from 'react';
import App from '../App';
import chai from 'chai';
import { expect } from 'chai';
import { mount } from 'enzyme';
import fetchMock from 'fetch-mock';
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const buildComponent = (renderType = shallow, newProps = {}, newState = {}) => {

  const defaultState = {
    query: 'The Beatles',
    artist: null,
    tracks: []
  };
  const AppState = Object.assign(defaultState, newState);

  const component = renderType(<App />);
  component.setState({
    query: AppState.query,
    artist: AppState.artist,
    tracks: AppState.track
  });
  component.update();

  return component;
};


describe.only('App integration test', () => {

  let app;

  beforeEach(() => {
    const mockArtistData = {
      artists: {
        items: [{
          genres: [
            'british invasion',
            'classic rock',
            'merseybeat',
            'protopunk',
            'psychedelic rock',
            'rock'
          ],
          followers: {
            total: 4229236
          },
          id: '3WrFJ7ztbogyGnTHbHJFl2',
          images: [{
            height: 640,
            url: 'https://i.scdn.co/image/197cff807611777427c93258f0a1ccdf6b013b09',
            width: 640
          }, {
            height: 640,
            url: 'https://i.scdn.co/image/197cff807611777427c93258f0a1ccdf6b013b09',
            width: 640
          }, {
            height: 640,
            url: 'https://i.scdn.co/image/197cff807611777427c93258f0a1ccdf6b013b09',
            width: 640
          }]
        }],
        name: "the beatles",
      }
    };
    const mockTrackData = {
      tracks: [{
        album_type: 'album',
        artists: [{
          external_urls: {
            spotify: 'https://open.spotify.com/artist/3WrFJ7ztbogyGnTHbHJFl2'
          },
          href: 'https://api.spotify.com/v1/artists/3WrFJ7ztbogyGnTHbHJFl2',
          id: '3WrFJ7ztbogyGnTHbHJFl2',
          name: "The Beatles",
          type: "artist",
          uri: "spotify:artist:3WrFJ7ztbogyGnTHbHJFl2"
        }],
        album: {
          images: [{
            height: 640,
            url: "https://i.scdn.co/image/c429243cd056974175abe72a3142d3dccffc166a",
            width: 640
          }]
        },
        preview_url: 'https://p.scdn.co/mp3-preview/3c97985f3736fab6d4abcd2067f346a9b30955fa?cid=b8b787dc817242eeaf9ff00df904ab5f'
      },{
        album_type: 'album',
        artists: [{
          external_urls: {
            spotify: 'https://open.spotify.com/artist/3WrFJ7ztbogyGnTHbHJFl2'
          },
          href: 'https://api.spotify.com/v1/artists/3WrFJ7ztbogyGnTHbHJFl2',
          id: '3WrFJ7ztbogyGnTHbHJFl2',
          name: "The Beatles",
          type: "artist",
          uri: "spotify:artist:3WrFJ7ztbogyGnTHbHJFl2"
        }],
        album: {
          images: [{
            height: 640,
            url: "https://i.scdn.co/image/c429243cd056974175abe72a3142d3dccffc166a",
            width: 640
          }]
        },
        preview_url: 'https://p.scdn.co/mp3-preview/3c97985f3736fab6d4abcd2067f346a9b30955fa?cid=b8b787dc817242eeaf9ff00df904ab5f'
      }]};

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

    fetchMock.mock({
      name: 'route',
      matcher:  'begin:https://api.spotify.com/v1/search',
      response: mockArtistData
    });
    fetchMock.mock({
      name: 'route',
      matcher:  'begin:https://api.spotify.com/v1/artists',
      response: {tracks: [
        {
          album_type: 'album',
          artists: [{
            external_urls: {
              spotify: 'https://open.spotify.com/artist/3WrFJ7ztbogyGnTHbHJFl2'
            },
            href: 'https://api.spotify.com/v1/artists/3WrFJ7ztbogyGnTHbHJFl2',
            id: '3WrFJ7ztbogyGnTHbHJFl2',
            name: "The Beatles",
            type: "artist",
            uri: "spotify:artist:3WrFJ7ztbogyGnTHbHJFl2"
          }],
          album: {
            images: [{
              height: 640,
              url: "https://i.scdn.co/image/c429243cd056974175abe72a3142d3dccffc166a",
              width: 640
            }]
          },
          preview_url: 'https://p.scdn.co/mp3-preview/3c97985f3736fab6d4abcd2067f346a9b30955fa?cid=b8b787dc817242eeaf9ff00df904ab5f'
        },
        {
          album_type: 'album',
          artists: [{
            external_urls: {
              spotify: 'https://open.spotify.com/artist/3WrFJ7ztbogyGnTHbHJFl2'
            },
            href: 'https://api.spotify.com/v1/artists/3WrFJ7ztbogyGnTHbHJFl2',
            id: '3WrFJ7ztbogyGnTHbHJFl2',
            name: "The Beatles",
            type: "artist",
            uri: "spotify:artist:3WrFJ7ztbogyGnTHbHJFl2"
          }],
          album: {
            images: [{
              height: 640,
              url: "https://i.scdn.co/image/c429243cd056974175abe72a3142d3dccffc166a",
              width: 640
            }]
          },
          preview_url: 'https://p.scdn.co/mp3-preview/3c97985f3736fab6d4abcd2067f346a9b30955fa?cid=b8b787dc817242eeaf9ff00df904ab5f'
        }
      ]}
    });

    app = buildComponent(mount, undefined, undefined);
  });

  afterEach(() => {

  });

  it('should test how stuff is mounted', () => {
    const input = app.find('.input-group-addon');
    input.simulate('click');
  });

});