import React from 'react';
import Profile from '../Profile';
import { shallow }from 'enzyme';
import { expect } from 'chai';

const buildComponent = (renderType = shallow, newProps = {}) => {

    const defaultProps = {
        artist: {
            images: [
                {
                    height: 1000,
                    url: "https://i.scdn.co/image/673cd94546df0536954198867516fee18cee1605",
                    width: 1000
                }
            ],
            followers: {
                total:8369645
            },
            genres: ['dance pop', 'pop'],
            name: 'yonce'
        }
    };
    const props = Object.assign(defaultProps, newProps);

    const component = renderType(<Profile {...props} />);

    return component;
};

describe('Profile unit tests', () => {

    let Profile;

    beforeEach(() => {
       Profile = buildComponent()
    });

    // should have img tag
    it('should render an <img/> elemnt with link to img', () => {
        expect(Profile.find('.profile-img')).to.have.length(1);
    });

    //should have genres
    it('should render a <Profile/> element', () => {
        expect(Profile.find('.profile-genres')).to.have.length(1);
    });

    // should have followeres
    it('should render a <Profile/> element', () => {
        expect(Profile.find('.profile-followers')).to.have.length(1);
    });


});