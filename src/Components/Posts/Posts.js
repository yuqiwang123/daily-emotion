import Axios from 'axios'
import React, { Component } from 'react'
import ShowPost from './ShowPost/ShowPost'
import img1 from '../../assets/asset-1.png'
import ShowUser from '../Users/ShowUsers/ShowUser'
import Spinner from '../../Containers/Spinner/Spinner'
import HeatMap from '@uiw/react-heat-map';
import song from './SinglePost/songs/joy.mp3'


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
            { date: '2022/01/11', count: 30 },
            { date: '2022/01/12', count: 20 },
            { date: '2022/01/13', count: 10 },
            ...[...Array(17)].map((_, idx) => ({ date: `2016/02/${idx + 10}`, count: idx, content: '' })),
            { date: '2022/02/11', count: 40 },
            { date: '2022/02/01', count: 50 },
            { date: '2022/02/02', count: 60 },
            { date: '2022/02/04', count: 0 },
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
                        <div className="col-8 ht-60 pr-0 mr-0">
                        <HeatMap
                            value={value}
                            width={600}
                            style={{ color: '#AD001D' }}
                            startDate={new Date('2022/01/01')}
                            panelColors={{
                                10: '#87CEEB',
                                20: '#FFD700',
                                30: '#F08080',
                                40: '#FF69B4',
                                50: '#00FF7F,',
                                60: '#7B68EE',
                            }}
                        />
                            <h5 style={{ color: '#87CEEB', display: 'inline' }}>sad</h5>
                            <h5 style={{color:'#FFD700', display: 'inline' }}> joy </h5>
                            <h5 style={{color:'#F08080', display: 'inline'}}> anger </h5>
                            <h5 style={{color:'#FF69B4', display: 'inline'}}> love </h5>
                            <h5 style={{color:'#00FF7F', display: 'inline'}}> surprise </h5>
                            <h5 style={{color:'#7B68EE', display: 'inline'}}>  fear  </h5>
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
