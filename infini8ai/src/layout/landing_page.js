import React, { Component } from 'react';
import Navbar from '../Components/Navbar/navbar.js'
import Hero from '../Components/Hero-section/hero-section.js'
import Features from '../Components/features-section/features.js'
import Works from '../Components/how-it-works/works.js'



 class landing extends Component {
    constructor() {
        super()
        this.state ={}

    }

    render() {


        return (
            <div>
                <Navbar />
                <Hero />
                <Features />
                <Works />

            </div>
        )
        }
}

export default landing
