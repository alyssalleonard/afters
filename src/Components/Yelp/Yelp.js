import React, { Component } from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import './Yelp.css'

class Yelp extends Component {
    constructor() {
        super();
        this.state = {
            reviews: [{
                user: {
                    image_url: '',
                    name: ''
                },
                text: ''
            }],
            currentReview: 0
        }
        this.nextReview = this.nextReview.bind(this);
        this.previousReview = this.previousReview.bind(this);
    }

    componentDidMount() {
        axios.get('/api/reviews').then(res => this.setState({
                reviews: res.data
            }))
    }

    nextReview() {
        if(this.state.currentReview < 2) {
            this.setState({
                currentReview: this.state.currentReview + 1
            })
        } else {
            this.setState({
                currentReview: 0
            })
        }
    }

    previousReview() {
        if(this.state.currentReview > 0) {
            this.setState({
                currentReview: this.state.currentReview -1
            })
        } else {
            this.setState({
                currentReview: 2
            })
        }
    }


    render() {
        const review = (
            <div className="reviews">
                <div className="user-profile">
                    <img className="profile-pic" src={this.state.reviews[this.state.currentReview].user.image_url} />
                    <span><strong>{this.state.reviews[this.state.currentReview].user.name}</strong></span>
                </div>
                <div className="review-content">
                    <div className="review-text">
                        <p>{this.state.reviews[this.state.currentReview].text}</p>
                    </div>
                    <div className="button-group">
                        <button onClick={this.previousReview}>Previous</button>
                        <button onClick={this.nextReview}>Next</button>
                    </div>
                </div>
            </div>
        )

        return(
            <div>
                <Header title="Reviews"/>
                {this.state.reviews.length > 0 ? review : ""}
            </div>
        )
    }
}

export default Yelp;