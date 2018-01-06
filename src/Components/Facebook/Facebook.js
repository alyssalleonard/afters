import React, { Component } from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import './Facebook.css'

class Facebook extends Component {
    constructor() {
        super();
        this.state = {
            imgURL: ""
        }
    }

    componentDidMount() {
        axios.get(`https://graph.facebook.com/v2.11/afterssweets/picture?redirect=false&type=large`)
        .then(res => {
            this.setState({imgURL: res.data.data.url})
        })
    }
    
    render() {
        return (
            <div>
                <Header title="Facebook"/>                
                <div className="fb">
                    <img className="fb-img" src={this.state.imgURL} />
                    <div className="fb-like" data-href="https://www.facebook.com/afterssweets/" data-layout="button" data-action="like" data-size="large" data-show-faces="false" data-share="true"></div>
                </div>
            </div>
        )
    }
}

export default Facebook;