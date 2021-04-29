import React, { Component } from 'react';
import { Jumbotron, Button, Container } from 'reactstrap'
class Home extends Component {
    constructor() {
        super()
        this.state = {}

    }

    render() {


        return (
            <Container>

                <Jumbotron className='bg-white'>
                    <h1 className="hero-heading text-center ">Transform thoughts into progressive ventures and services
                    <br></br> WITH</h1>
                    <p className="hero-text text-center">
                        Interaction Design, Technology, Innovation & Support
                    </p>
                    {/* <hr className="my-2" /> */}
                    {/* <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                    <p className="lead">
                        <Button color="primary">Learn More</Button>
                    </p> */}
                </Jumbotron>

            </Container>
        )
    }
}

export default Home
