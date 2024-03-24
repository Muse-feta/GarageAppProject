import React from 'react'
import video from '../../../assets/images/video.jpg'

const VideoSectionComponent = () => {
  return (
    <section class="video-section">
      <div
        data-parallax='{"y": 50}'
        class="sec-bg"
        style={{ backgroundImage: "url(" + video + ")" }}
      ></div>
      <div class="auto-container">
        <h5>Working since 1992</h5>
        <h2>
          We are leader <br /> in Car Mechanical Work
        </h2>
        <div class="video-box">
          <div class="video-btn">
            <a
              href="https://www.youtube.com/watch?v=nfP5N9Yc72A&amp;t=28s"
              class="overlay-link lightbox-image video-fancybox ripple"
            >
              <i class="flaticon-play"></i>
            </a>
          </div>
          <div class="text">
            Watch intro video <br /> about us
          </div>
        </div>
      </div>
    </section>
  );
}

export default VideoSectionComponent