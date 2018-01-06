import React, { Component } from 'react';
import './Nav.css';

class Nav extends Component {
    constructor() {
        super();
        this.state = {
            navLinks: ['home', 'schedule', 'menu', 'contact us']
        }
    }

    render() {
        let links = this.state.navLinks.map((link,index) => {
            return (<li><a key={index} className={link}href="#">{link}</a></li>)
        })
        return (
            <nav className="nav">
                <ul className="links">
                    {links}
                </ul>
            </nav>
         )
    }
}

export default Nav;