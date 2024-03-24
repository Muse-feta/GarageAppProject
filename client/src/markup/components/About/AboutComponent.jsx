import React from 'react'
import vban1 from "../../../assets/images/vban1.jpg"
import vban2 from "../../../assets/images/vban2.jpg"

const AboutComponent = () => {
  return (
     <section class="about-section">
        <div class="auto-container">
            <div class="row">
                <div class="col-lg-5">
                    <div class="image-box">
                        <img src={vban1} alt=""/>
                        <img src={vban2} alt=""/>
                        <div class="year-experience" data-parallax='{"y": 30}'><strong>24</strong> years <br/> Experience </div>
                    </div>
                </div>
                <div class="col-lg-7 pl-lg-5">
                    <div class="sec-title">
                        <h5>Welcome to Our workshop</h5>
                        <h2>We have 24 years experience</h2>
                        <div class="text">
                            <p>Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.</p> 
                            <p>Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing.</p>
                        </div>
                        <div class="link-btn mt-40"><a href="about.html" class="theme-btn btn-style-one style-two"><span>About Us <i class="flaticon-right"></i></span></a></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default AboutComponent