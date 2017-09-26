import React from 'react';
import App from '../App';
import { shallow } from 'enzyme';
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

import { expect } from 'chai';

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

});
