import Axios from 'axios'
import React, { Component } from 'react'
import './SinglePost.css'
import avtar from '../../../assets/avtar.jpg'
import { Link } from 'react-router-dom'
import moment from "moment";
import Spinner from '../../../Containers/Spinner/Spinner'
import Modal from '../../../Containers/Modal/Modal'

import ReactAudioPlayer from 'react-audio-player';
import Icon from "react-crud-icons";
import "../../../../node_modules/react-crud-icons/dist/css/react-crud-icons.css";
import joy from './songs/joy.mp3'
import anger from './songs/anger.mp3'
import fear from './songs/fear.mp3'
import love from './songs/love.mp3'
import sadness from './songs/sadness.mp3'
import surprise from './songs/surprise.mp3'

export class SinglePost extends Component {
    constructor(props) {
        super(props)

        this.state = {
            singlePost: {},
            error: {
                message: '',
                code: ''
            },
            isloading: false,
            show: false
        }

    }

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    componentDidMount() {

        this.setState(pre => ({
            isloading: true
        }))
        let id = this.props.match.params.id
        Axios.get('/posts/' + id).then(res => {
            this.setState({ ...this.state.singlePost, singlePost: res.data, isloading: false });
            return Axios.get("/profile/bycreator/" + res.data.creator)
        }).then(data => {
            this.setState({ ...this.state.singlePost, user: data.data.profile, isloading: false });
        }).catch(e => {
                this.setState({
                    isloading: false,
                    error: {
                        ...this.state.error, message: e.response.data.message,
                        code: e.response.status
                    }
                });
            })

    }


    deletePost=(id)=>{
        this.setState(pre => ({
            isloading: true
        }))
       Axios.delete("/posts/"+id).then(data=>{
        this.setState(pre => ({
            isloading: false
        }))
        this.props.history.push('/mypost')
       })
       .catch(e=>{
        this.setState({
            isloading: false,
            error: {
                ...this.state.error, message: e.response.data.message,
                code: e.response.status
            }
        });
       })
    }
   
    render() {
        let isLoading
        let iserror

        if (this.state.isloading) {
            isLoading = (
                <>
                    <div className="container loading">
                        <div className="mar-20">
                            <Spinner />
                        </div>
                    </div>
                </>
            )
        }

        if (this.state.error.code) {
            iserror = (
                <>
                    <div className="container error container-short">
                        <div className="mar-20">
                            <h5>Error Code - {this.state.error.code}</h5>
                            <h4>Error Message - {this.state.error.message}</h4>
                        </div>
                    </div>
                </>
            )
        }

        let post
        let post1 = this.state.singlePost
        let user = this.state.user
        if (this.state.singlePost) {

            post = (<>
                <div className='card pt-5 pl-5 mt-5 ml-9'>
                    <div>
                        <ReactAudioPlayer
                            src={post1.emotion}
                            autoPlay
                            controls
                        />
                    </div>
                <div>
                        <div className='pt-5'>{moment(post1.postDate).format("MMM DD, YYYY")}</div>
                        {this.props.match.path === "/mypost/:id" &&
                            <div className="col-3 d-block col-xs-12" id="edit">
                                <div>
                                    <Link class="btn btn-light col-7" style={{backgroundColor: 'white'}} to={"/edit/" + post1._id}>
                                        <Icon
                                            name = "edit"
                                            tooltip = "Edit"
                                            theme = "light"
                                            size = "medium"
                                        />
                                    </Link>
                                    <button id="deletebtn" class="btn btn-light col-7" type="button" onClick={this.showModal}>
                                        <Icon
                                            name = "delete"
                                            tooltip = "Delete"
                                            theme = "light"
                                            size = "medium"
                                        />
                                    </button>
                                </div>
                            </div>}
                    </div>
        
                    <br/><h4>{post1.title}</h4>
                    <div className="singlePost_content">
                        <div className="text">
                            <p>{post1.content}</p>
                        </div>
                    </div>
                </div>
            </>
            );
        }
        return (<>
            {isLoading}
            {iserror}
            <div className='row'>
                <div className='col' id='backgroundpicture' style={{backgroundImage: `url("http://localhost:3001/images/${post1.emotion}-bg.jpg")`}}>
                    <div className='emotiontag'>{moment(post1.postDate).format("MMMM DD")} <br/>{post1.emotion}</div>
                </div>
                <div className="col-7 py-4 SingleBlog ">
                    <div className='h-15 m-auto' id="post">POST</div>
                    <div className="row">
                        
                        <div className="col-md-9 col-xs-12 main">
                            <Modal show={this.state.show} handleClose={this.hideModal}>
                                <div className="modal-header">
                                <h2>{post1.title}</h2>
                                <button type="button" className="close" data-dismiss="modal" onClick={this.hideModal}>&times;</button>
                                
                                </div>
                                <div className="modal-body">
                                    Confirm delete
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" onClick={()=>this.deletePost(post1._id)}>Delete </button>
                                    <button type="button" className="btn btn-outline-dark" onClick={this.hideModal} data-dismiss="modal">Close</button>
                                </div>
                            </Modal>
                            {post}
                        </div>
                        
                    </div>
                </div>
            </div>
            
        </>
        )
    }
}

export default SinglePost
