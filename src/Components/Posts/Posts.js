import Axios from 'axios'
import React, { Component } from 'react'
import ShowPost from './ShowPost/ShowPost'
import img1 from '../../assets/asset-1.png'
import ShowUser from '../Users/ShowUsers/ShowUser'
import Spinner from '../../Containers/Spinner/Spinner'
import HeatMap from '@uiw/react-heat-map';
import song from './joy.mp3'


export class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: [],
            users: [],
            isloading: false,
            // Get audio file in a variable
            audio: new Audio(song),

            // Set initial state of song
            isPlaying: false
        }

    }
    

    componentDidMount() {
        this.setState(pre => ({
            isloading: true
        }))
        Promise.all([
            Axios.get('/posts'),
            Axios.get('/profile/profiles')
        ]).then(data => {
            this.setState(pre => ({
                isloading: false
            }))
            this.setState({ ...this.state.posts, posts: data[0].data.posts });
            this.setState({ ...this.state.users, users: data[1].data.profile });
        })
            .catch(e => {
                this.setState(pre => ({
                    isloading: false
                }))
            })
    }

    render() {
        let isLoading
        if (this.state.isloading) {
            isLoading = <Spinner />
        }
        let fetchedposts
        let allUsers
        if (this.state.posts) {
            fetchedposts = this.state.posts.map((post, index) => (
                <ShowPost key={index} {...post} {...index} />
            ))
        }
        if (this.state.users) {
            allUsers = this.state.users.map((user, index) => (
                <ShowUser key={index} {...user} {...index} />
            ))
        }
    

        // Main function to handle both play and pause operations
        this.playPause = () => {

            // Get state of song
            let isPlaying = this.state.isPlaying;

            if (isPlaying) {
            // Pause the song if it is playing
            this.state.audio.pause();
            } else {

            // Play the song if it is paused
            this.state.audio.play();
            }

            // Change the state of song
            this.setState({ isPlaying: !isPlaying });
        };

        let value = [
            { date: '2016/01/11', count: 2 },
            { date: '2016/01/12', count: 20 },
            { date: '2016/01/13', count: 10 },
            ...[...Array(17)].map((_, idx) => ({ date: `2016/02/${idx + 10}`, count: idx, content: '' })),
            { date: '2016/04/11', count: 2 },
            { date: '2016/05/01', count: 5 },
            { date: '2016/05/02', count: 5 },
            { date: '2016/05/04', count: 11 },
          ]
        return (
            <div>

                <div className="container hero">
                    <div className="row align-items-center text-center text-md-left">
                        <div className="col-lg-4">
                            <h1 className="mb-3 display-3">
                                Tell Me Your Story 
                    </h1>
                            <p>
                                Record your daily emotion !!
                    </p>
                        </div>
                        <div className="col-lg-8">
                            <HeatMap value={value} startDate={new Date('2016/01/01')} />
                        </div>
                    </div>


                </div>
                <div className="container hero py-5">
                    <div className="row">
                        <div className="col-md-8 col-xs-12">
                            <div className="row">
                            <div>
                            {/* Show state of song on website */}
                            <p>
                            {this.state.isPlaying ? 
                                "Song is Playing" : 
                                "Song is Paused"}
                            </p>

                            {/* Button to call our main function */}
                            <button onClick={this.playPause}>
                            Play | Pause
                            </button>
                        </div>
                                {fetchedposts}
                            </div>
                        </div>

                        <div className="col-md-4 col-xs-12 pl-4">
                            <h3 className="mb-4"> </h3>
                            <hr></hr>
                            {allUsers}
                        </div>
                    </div>
                </div>

                <div className="container loading">
                    {isLoading}
                </div>
            </div>
        )
    }
}

export default App
