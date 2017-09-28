import React from 'react';
import App from '../App';
import chai from 'chai';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import fetchMock from 'fetch-mock';
const sinonChai = require('sinon-chai');
chai.use(sinonChai);


const buildComponent = (renderType = shallow, newProps = {}, newState = {}) => {

    const defaultState = {
        query: '',
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

describe('<App/>', () => {

    describe('search box', () => {

        it('should render <app/> element', () => {
            const wrapper = shallow(<App/>);
            expect(wrapper.find('FormGroup')).to.have.length(1);
        });

        it('should NOT render the <Gallery/>', () => {
            const wrapper = shallow(<App/>);
            expect(wrapper.find('Gallery')).to.have.length(0);
        });

        it('should NOT render the <Profile/>', () => {
            const wrapper = shallow(<App/>);
            expect(wrapper.find('Profile')).to.have.length(0);
        });

    });

    describe('search results', () => {

        let App;
        let newState;

        beforeEach(() => {
            newState = {
                query: 'Yonce',
                artist: {},
                tracks: []
            };
            App = buildComponent(shallow, undefined, newState);
        });

        it('should render a <Profile/> element when given search item', () => {
            expect(App.find('Profile')).to.have.length(1);
        });

        it('should render a <Gallery/> element when given search item', () => {
            expect(App.find('Gallery')).to.have.length(1);
        });

    });

    describe('search() method', () => {
      let app;
      let appInstance;
      let newState;

      beforeEach(() => {

        const mockArtistData = {
          artists: {
            items: [{
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
          }]};

        fetchMock.mock({
          name: 'route',
          matcher:  'begin:https://api.spotify.com/v1/search',
          response: mockArtistData
        });

        fetchMock.mock({
          name: 'route',
          matcher:  'begin:https://api.spotify.com/v1/artists',
          response: mockTrackData
        });

        newState = {
          query: "The Beatles",
          artist: {},
          tracks: []
        };

        app = buildComponent(shallow, undefined, newState);
        appInstance = app.instance();
      });

      it('should set the artist state when search() function is executed', () => {
        // mount & set query state first
        appInstance.search();
      });

    });

});
