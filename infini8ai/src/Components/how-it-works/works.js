import React, { Component } from 'react';
import { Jumbotron, Button, Container } from 'reactstrap'
class Works extends Component {
    constructor() {
        super()
        this.state = {}

    }

    render() {


        return (
            <Container>
                <div class=" py-5 service-1">

                    <h3 className='section-headings-sm text-center text-grey'>OUR PROCESS</h3>
                    <h3 className='section-headings text-center text-grey'>Our 'itterative' approch helps expand development</h3>
                    <p className='base-text text-center padding-sides-100 text-grey'>From understanding your clients and business difficulties to building up your product and taking it to showcase in the briefest conceivable time, 
                        we customize how we work to accommodate your venture needs.</p>

                    
                    <div class="row">

                        <div class="col-md-3 wrap-service1-box">
                            <div class="card border-0 card-shadow mb-4">
                                <div class="card-body text-center font ">
                                    <div class="my-3"><img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/features/feature1/market.png" alt="wrapkit" /></div>
                                    <h6 class="font-weight-medium  text-grey base-text ">Quick Launch</h6>
                                    <p class="mt-3">You can relay on our amazing features list and also our customer services will be great experience.</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-3 wrap-service1-box">
                            <div class="card border-0 card-shadow mb-4">
                                <div class="card-body text-center font">
                                    <div class="my-3"><img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/features/feature1/fruit.png" alt="wrapkit" /></div>
                                    <h6 class="font-weight-medium  text-grey base-text">MVP within a month</h6>
                                    <p class="mt-3">You can relay on our amazing features list and also our customer services will be great experience.</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-3 wrap-service1-box">
                            <div class="card border-0 card-shadow mb-4">
                                <div class="card-body text-center font">
                                    <div class="my-3"><img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/features/feature1/instant.png" alt="wrapkit" /></div>
                                    <h6 class="font-weight-medium text-grey base-text">Prototypes</h6>
                                    <p class="mt-3">You can relay on our amazing features list and also our customer services will be great experience.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3 wrap-service1-box">
                            <div class="card border-0 card-shadow mb-4">
                                <div class="card-body text-center font ">
                                    <div class="my-3"><img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/features/feature1/instant.png" alt="wrapkit" /></div>
                                    <h6 class="font-weight-medium text-grey base-text">Support</h6>
                                    <p class="mt-3 ">You can relay on our amazing features list and also our customer services will be great experience.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 mt-3 text-center">
                            <a class="btn btn-success-gradiant text-white btn-md border-0 font" href="#f1"><span>View Details</span></a>
                        </div>

                        
                    </div>
                </div>

            </Container>
        )
    }
}

export default Works
