import React, { Component } from 'react';
import './App.css';
import Nav from './Components/Nav/Nav';
import Facebook from './Components/Facebook/Facebook';
import Yelp from './Components/Yelp/Yelp';
import Events from './Components/Events/Events'
import img from './logo.png';
import cinna from './cinnababe.jpg'
import strawberry from './strawberry.jpg'

class App extends Component {
  render() {
    return (
      <div>
        <header>
         <Nav />
        </header>
        <div className="heroImg">
          <img src={img} alt="img" className="logo"/>
        </div>
        <div className="skeevers">
          <img src={cinna} alt="img"/>
          <img src={strawberry} alt="img"/>
        </div>
        <div className="content">
          <div className="events-frame">
            <Events />
          </div>
          <div className="social">
            <Facebook />
            <Yelp />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
