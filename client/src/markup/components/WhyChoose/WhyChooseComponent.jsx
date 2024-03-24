import React from 'react'
import choose from '../../../assets/images/choose.jpg'

const WhyChooseComponent = () => {
  return (
    <section class="why-choose-us">
            <div class="auto-container">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="sec-title style-two">
                            <h2>Why Choose Us</h2>
                            <div class="text">Bring to the table win-win survival strategies to ensure proactive
                                domination. At the end of the day, going forward, a new normal that has evolved from
                                generation heading towards.</div>
                        </div>
                        <div class="icon-box">
                            <div class="icon"><span class="flaticon-mechanic"></span></div>
                            <h4>Certified Expert Mechanics</h4>
                        </div>
                        <div class="icon-box">
                            <div class="icon"><span class="flaticon-wrench"></span></div>
                            <h4>Fast And Quality Service</h4>
                        </div>
                        <div class="icon-box">
                            <div class="icon"><span class="flaticon-price-tag-1"></span></div>
                            <h4>Best Prices in Town</h4>
                        </div>
                        <div class="icon-box">
                            <div class="icon"><span class="flaticon-trophy"></span></div>
                            <h4>Awarded Workshop</h4>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="sec-title style-two">
                            <h2>Addtional Services</h2>
                        </div>
                        <div class="row">
                            <div class="col-md-5">
                                <div class="image"><img src={choose} alt=""/></div>
                            </div>
                            <div class="col-md-7">
                                <ul class="list">
                                    <li>General Auto Repair & Maintenance</li>
                                    <li>Transmission Repair & Replacement</li>
                                    <li>Tire Repair and Replacement</li>
                                    <li>State Emissions Inspection</li>
                                    <li>Break Job / Break Services</li>
                                    <li>Electrical Diagnostics</li>
                                    <li>Fuel System Repairs</li>
                                    <li>Starting and Charging Repair</li>
                                    <li>Steering and Suspension Work</li>
                                    <li>Emission Repair Facility</li>
                                    <li>Wheel Alignment</li>
                                    <li>Computer Diagaonstic Testing</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default WhyChooseComponent