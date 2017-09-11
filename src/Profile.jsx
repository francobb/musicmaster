import React, { Component } from 'react';
import './App.css';

class Profile extends Component {
    // constructor(props){
    //     super(props);
    // }

    render(){
        console.log('this.props', this.props);

        let artist = {name: '', followers: {total: ''}, images: [{url: ''}], genres: []};

        if (this.props.artist !== null) {
            artist = this.props.artist;
        }
        artist = this.props.artist !== null ? this.props.artist : artist;

        return(
            <div>
                <img
                    alt='Profile'
                    className='profile-img'
                    src={artist.images[0].url}
                />
                <div>{artist.name}</div>
                <div>{artist.followers.total}</div>
                <div>
                    {
                        artist.genres.map((genre, key) => {
                            return (
                                <span key={key}>{genre}</span>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Profile;