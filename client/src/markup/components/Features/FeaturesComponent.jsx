import React from 'react'
import feature from '../../../assets/images/feature.jpg'

const FeaturesComponent = () => {
  return (
    <section class="features-section">
            <div class="auto-container">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="inner-container">
                            <h2>Quality Service And <br/> Customer Satisfaction !!</h2>
                            <div class="text">We utilize the most recent symptomatic gear to ensure your vehicle is
                                fixed or adjusted appropriately and in an opportune manner. We are an individual from
                                Professional Auto Service, a first class execution arrange, where free assistance
                                offices share shared objectives of being world-class car administration focuses.</div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="image"><img className='h-[335px] w-[600px]' src={feature} alt=""/></div>
                    </div>
                </div>
            </div>
        </section>

  )
}

export default FeaturesComponent